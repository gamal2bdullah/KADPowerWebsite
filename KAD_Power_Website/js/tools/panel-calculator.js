(function(){
  function compute(){
    const v = KADCalc.values();
    const reqW   = (v.daily_kwh * 1000) / (v.psh * v.sys_eff) * v.oversize;
    const panels = Math.ceil(reqW / v.panel_w);
    const totalW = panels * v.panel_w;
    const daily  = (totalW * v.psh * v.sys_eff) / 1000;
    const futureW= reqW * (1 + v.expansion/100);
    KADCalc.render({
      required_w: reqW.toFixed(0),
      panels: panels,
      total_w: totalW.toFixed(0),
      daily_prod: daily.toFixed(2),
      future_w: futureW.toFixed(0)
    });
  }
  KADCalc.init(compute);
})();
