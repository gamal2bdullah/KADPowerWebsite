(function(){
  function compute(){
    const v = KADCalc.values();
    const ledTotal   = v.led * v.led_w;
    const acTotal    = v.ac * v.ac_w;
    const totalW     = ledTotal + acTotal + v.fridge_w + v.other_w;
    const dailyWh    = ledTotal*v.led_h + acTotal*v.ac_h + v.fridge_w*v.fridge_h + v.other_w*v.other_h;
    const peakW      = totalW * v.demand;
    const inverterKVA= (peakW * 1.25) / 1000;
    const batteryKWh = (dailyWh/1000) * v.autonomy / 0.85;
    const arrayW     = (dailyWh / 5.0) * 1.25; // 5 PSH default
    KADCalc.render({
      total_w: totalW.toFixed(0),
      daily_wh: dailyWh.toFixed(0),
      peak_w: peakW.toFixed(0),
      inverter: inverterKVA.toFixed(2),
      battery_kwh: batteryKWh.toFixed(2),
      array_w: arrayW.toFixed(0)
    });
  }
  KADCalc.init(compute);
})();
