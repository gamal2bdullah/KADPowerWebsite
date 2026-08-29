/* KAD Power — Project Report Generator
   Reads the input form, populates the report paper, and binds
   print / export-PDF actions. Uses the existing window.print() pathway
   (the only universal client-side PDF route without bundling a heavy lib). */

(function () {
  'use strict';

  function fmt(n) {
    const v = parseFloat(n);
    if (isNaN(v)) return n;
    return v.toLocaleString('ar-EG');
  }

  function build() {
    const get = id => document.getElementById(id).value;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    // Project metadata
    set('rp_client',   get('r_client'));
    set('rp_project',  get('r_project'));
    set('rp_engineer', get('r_engineer'));
    set('rp_location', get('r_location'));
    const d = get('r_date') || new Date().toISOString().substring(0, 10);
    set('rp_date', new Date(d).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }));

    // Numbers
    const kwp     = parseFloat(get('r_kwp')) || 0;
    const panels  = parseInt(get('r_panels')) || 0;
    const inv     = parseFloat(get('r_inv')) || 0;
    const batt    = parseFloat(get('r_batt')) || 0;
    const annual  = parseFloat(get('r_annual')) || 0;
    const savings = parseFloat(get('r_savings')) || 0;

    set('rp_kwp',     fmt(kwp));
    set('rp_panels',  fmt(panels));
    set('rp_inv',     fmt(inv));
    set('rp_batt',    fmt(batt));
    set('rp_annual',  fmt(annual));
    set('rp_savings', fmt(savings));

    // Environment KPIs
    const co2   = annual * 0.85;
    const trees = co2 / 21;
    set('rp_co2',   fmt(co2.toFixed(0)));
    set('rp_trees', fmt(trees.toFixed(0)));
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reportForm');
    if (!form) return;

    // Pre-fill today's date
    const dateInput = document.getElementById('r_date');
    if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();

    // Build once on load with default values
    build();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      build();
      const paper = document.getElementById('reportPaper');
      paper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      paper.animate(
        [{ boxShadow: '0 0 0 0 rgba(153,243,108,.0)' }, { boxShadow: '0 0 0 12px rgba(153,243,108,.25)' }, { boxShadow: '0 16px 40px rgba(0,0,0,.06)' }],
        { duration: 900, easing: 'ease-out' }
      );
    });

    document.getElementById('printReport').addEventListener('click', () => window.print());
    document.getElementById('exportReport').addEventListener('click', () => {
      // Print-to-PDF flow (universal, no external library required)
      window.print();
    });
  });
})();
