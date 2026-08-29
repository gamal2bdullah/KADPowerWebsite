(function(){
  function compute(){
    const v = KADCalc.values();
    // Hydraulic power (W) = rho * g * Q * H ; Q in m^3/s
    const Q = v.vol / (v.psh * 3600);
    const Ph = 1000 * 9.81 * Q * v.tdh;
    const Pp = Ph / v.pump_eff;
    const Pdc = Pp / v.inv_eff;
    const PV = Pdc * 1.25; // 25% PV oversize
    const dailyKWh = (Pp * v.psh)/1000;
    KADCalc.render({
      hydraulic: Ph.toFixed(0),
      pump_w:    Pp.toFixed(0),
      pv_w:      PV.toFixed(0),
      daily_kwh: dailyKWh.toFixed(2)
    });
  }
  KADCalc.init(compute);
})();
