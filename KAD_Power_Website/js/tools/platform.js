/* ==========================================================================
   KAD Power — Solar Engineering Platform shared helpers
   Provides:
     • KADCalc.init(computeFn)  → wires form submit / reset / copy / print / export
     • KADCalc.values()         → returns {fieldName: number} from current form
     • KADCalc.render(obj)      → updates result rows by [data-key]
   ========================================================================== */

(function (global) {
  'use strict';

  const KADCalc = {

    init: function (computeFn) {
      const form    = document.getElementById('calcForm');
      const results = document.getElementById('calcResults');
      const empty   = document.getElementById('calcEmpty');
      const reset   = document.getElementById('calcReset');
      const copy    = document.getElementById('calcCopy');
      const print   = document.getElementById('calcPrint');
      const exp     = document.getElementById('calcExport');

      if (!form) return;
      this._computeFn = computeFn;
      this._results   = results;
      this._empty     = empty;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
        computeFn();
        empty.hidden    = true;
        results.hidden  = false;
        results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });

      if (reset) reset.addEventListener('click', function () {
        form.reset();
        form.classList.remove('was-validated');
        results.hidden = true;
        empty.hidden   = false;
      });

      if (copy) copy.addEventListener('click', function () {
        const lines = [];
        results.querySelectorAll('.calc-result-row').forEach(r => {
          lines.push(r.querySelector('.calc-result-label').innerText.trim()
                   + ': '
                   + r.querySelector('.calc-result-value').innerText.trim());
        });
        const txt = lines.join('\n');
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => toast('تم نسخ النتائج إلى الحافظة.'));
        else { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('تم نسخ النتائج.'); }
      });

      if (print) print.addEventListener('click', function () { window.print(); });

      if (exp) exp.addEventListener('click', function () {
        // Opens the print dialog with "Save as PDF" target — standard PDF export path
        toast('سيتم فتح حوار الطباعة. اختر «حفظ بصيغة PDF» لتصدير التقرير.');
        setTimeout(() => window.print(), 600);
      });

      // Auto-compute on first load with default values so result panel is never empty for demo
      try {
        if (form.checkValidity()) {
          computeFn();
          empty.hidden = true;
          results.hidden = false;
        }
      } catch (e) { /* noop */ }
    },

    values: function () {
      const form = document.getElementById('calcForm');
      const out  = {};
      [...form.elements].forEach(el => {
        if (!el.name && !el.id) return;
        const key = el.name || el.id;
        if (el.tagName === 'SELECT') out[key] = el.value;
        else if (el.type === 'number' || el.classList.contains('calc-input')) {
          const num = parseFloat(el.value);
          out[key] = isNaN(num) ? el.value : num;
        } else out[key] = el.value;
      });
      return out;
    },

    render: function (obj) {
      Object.keys(obj).forEach(k => {
        const row = this._results.querySelector(`.calc-result-row[data-key="${k}"]`);
        if (row) row.querySelector('.num').textContent = obj[k];
      });
    }
  };

  function toast(msg) {
    const wrap = document.createElement('div');
    wrap.className = 'position-fixed bottom-0 end-0 p-3';
    wrap.style.zIndex = 9999;
    wrap.innerHTML = `<div class="toast show text-bg-light" role="alert"><div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle-fill text-heading-color-1 me-2"></i>${msg}</div><button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`;
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 3500);
  }

  global.KADCalc = KADCalc;
})(window);

/* --------------------------------------------------------------------------
   Generic UI behaviour: catalog / tools-hub search + filter + view-toggle
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

  // ---- catalog (products / tools) chip filter & search ----
  function setupFilterable(opts) {
    const items   = document.querySelectorAll(opts.itemSelector);
    const empty   = document.getElementById(opts.emptyId);
    const chips   = document.querySelectorAll(opts.chipSelector);
    const search  = document.getElementById(opts.searchId);
    const sort    = document.getElementById(opts.sortId || '');
    const view    = document.querySelectorAll(opts.viewSelector || '');
    const grid    = document.getElementById(opts.gridId || '');
    let state = { cat: 'all', q: '', sort: 'featured' };

    function apply() {
      let visible = 0;
      items.forEach(el => {
        const cat  = el.getAttribute(opts.catAttr);
        const name = (el.getAttribute('data-name') || el.innerText).toLowerCase();
        const show = (state.cat === 'all' || cat === state.cat)
                  && (!state.q || name.includes(state.q));
        el.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (empty) empty.hidden = visible !== 0;

      // sort
      if (sort && grid) {
        const arr = [...items].filter(el => el.style.display !== 'none');
        arr.sort((a, b) => {
          switch (state.sort) {
            case 'price-asc':  return (+a.dataset.price || 0) - (+b.dataset.price || 0);
            case 'price-desc': return (+b.dataset.price || 0) - (+a.dataset.price || 0);
            case 'rating':     return (+b.dataset.rating || 0) - (+a.dataset.rating || 0);
            case 'name':       return (a.dataset.name || '').localeCompare(b.dataset.name || '', 'ar');
            default:           return 0;
          }
        });
        arr.forEach(el => grid.appendChild(el));
      }
    }

    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      state.cat = c.dataset.filter || c.dataset.toolFilter;
      apply();
    }));

    if (search) search.addEventListener('input', e => { state.q = e.target.value.toLowerCase().trim(); apply(); });
    if (sort)   sort.addEventListener('change', e => { state.sort = e.target.value; apply(); });

    if (view.length && grid) {
      view.forEach(v => v.addEventListener('click', () => {
        view.forEach(x => x.classList.remove('active'));
        v.classList.add('active');
        grid.classList.toggle('list-view', v.dataset.view === 'list');
        if (v.dataset.view === 'list') {
          grid.querySelectorAll('[class*="col-"]').forEach(c => { c.dataset._orig = c.className; c.className = 'col-12'; });
        } else {
          grid.querySelectorAll('[data-_orig]').forEach(c => { c.className = c.dataset._orig; delete c.dataset._orig; });
        }
      }));
    }

    const reset = document.getElementById('resetFilters');
    if (reset) reset.addEventListener('click', () => {
      state = { cat: 'all', q: '', sort: 'featured' };
      if (search) search.value = '';
      if (sort) sort.value = 'featured';
      chips.forEach(c => c.classList.remove('active'));
      const all = [...chips].find(c => (c.dataset.filter || c.dataset.toolFilter) === 'all');
      if (all) all.classList.add('active');
      apply();
    });
  }

  if (document.getElementById('productsGrid')) {
    setupFilterable({
      itemSelector: '.product-item',
      catAttr: 'data-cat',
      chipSelector: '.catalog-categories .tool-filter-btn[data-filter]',
      searchId: 'productSearch',
      sortId:   'productSort',
      viewSelector: '.view-toggle .view-btn',
      gridId: 'productsGrid',
      emptyId: 'emptyState'
    });
  }
  if (document.getElementById('toolsGrid')) {
    setupFilterable({
      itemSelector: '.tool-item',
      catAttr: 'data-tool-cat',
      chipSelector: '.catalog-categories .tool-filter-btn[data-tool-filter]',
      searchId: 'toolSearch',
      gridId: 'toolsGrid',
      emptyId: 'toolEmpty'
    });
  }

  // ---- product gallery thumbnail swap ----
  const main = document.getElementById('galleryMain');
  if (main) {
    document.querySelectorAll('.gallery-thumb').forEach(t => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.gallery-thumb').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        main.src = t.dataset.src;
        const a = main.closest('a');
        if (a) a.href = t.dataset.src;
      });
    });
  }
});
