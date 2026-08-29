(function(){
  function compute(){
    const v   = KADCalc.values();
    const rho = v.material === 'cu' ? 0.0175 : 0.028; // ohm.mm^2/m
    const vdMax = v.voltage * v.vd_pct / 100;
    let factor;
    if (v.phase === 'dc')  factor = 2;            // round trip
    else if (v.phase === '1ph') factor = 2;
    else factor = Math.sqrt(3);                   // 3-phase
    const A = (factor * rho * v.length * v.current) / vdMax;
    // standard cable sizes (mm²)
    const std=[1.5,2.5,4,6,10,16,25,35,50,70,95,120,150,185,240];
    const Astd = std.find(s => s >= A * v.iec) || std[std.length-1];
    const R = rho * v.length / Astd;
    const vdActual = (factor * R * v.current);
    const lossW   = v.current * v.current * R;
    KADCalc.render({
      vd_max:    vdMax.toFixed(2),
      section_min: A.toFixed(2),
      section_std: Astd,
      loss_w:    lossW.toFixed(1),
      vd_actual: ((vdActual/v.voltage)*100).toFixed(2)
    });
  }
  KADCalc.init(compute);
})();
