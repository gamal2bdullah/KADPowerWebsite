(function(){
  function compute(){
    const v = KADCalc.values();
    const rho = v.material === 'cu' ? 0.0175 : 0.028;
    const R = (rho * v.l) / v.a;
    const factor = v.phase === '3ph' ? Math.sqrt(3) : 2;
    const vd = factor * R * v.i;
    const pct = (vd / v.v) * 100;
    const status = pct <= 3 ? 'ضمن الحد الآمن (≤3%)' : (pct <= 5 ? 'مقبول (3–5%)' : 'مرتفع جدًا (>5%)');
    const loss = v.i * v.i * R;
    KADCalc.render({
      vd_v:   vd.toFixed(2),
      vd_pct: pct.toFixed(2),
      status: status,
      loss_w: loss.toFixed(1)
    });
  }
  KADCalc.init(compute);
})();
