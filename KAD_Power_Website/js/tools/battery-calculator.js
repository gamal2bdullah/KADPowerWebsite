(function(){
  function compute(){
    const v = KADCalc.values();
    const usable = v.daily_kwh * v.autonomy;
    const total  = (usable / (v.dod * v.batt_eff)) * v.safety;
    const tempAdj= total / v.temp;
    const ah     = (tempAdj * 1000) / v.vbus;
    const stringSize = Math.ceil(ah / 200); // assume 200Ah per battery string
    KADCalc.render({
      usable_kwh: usable.toFixed(2),
      total_kwh: tempAdj.toFixed(2),
      total_ah: ah.toFixed(0),
      strings: stringSize,
      temp_adj: tempAdj.toFixed(2)
    });
  }
  KADCalc.init(compute);
})();
