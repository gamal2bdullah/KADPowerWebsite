(function(){
  function compute(){
    const v = KADCalc.values();
    let cumulative = 0, paybackYr = 0, npv = -v.cost, totalSave = 0;
    const r = v.discount/100, infl = v.inflation/100;
    for (let y=1; y<=v.life; y++){
      const annual = v.annual_kwh * v.tariff * Math.pow(1+infl, y-1) - v.maint;
      totalSave += annual;
      cumulative += annual;
      npv += annual / Math.pow(1+r, y);
      if (paybackYr === 0 && cumulative >= v.cost) paybackYr = y - 1 + (v.cost - (cumulative - annual))/annual;
    }
    const annualFirst = v.annual_kwh * v.tariff - v.maint;
    const net = totalSave - v.cost;
    const roiPct = (net / v.cost) * 100;
    KADCalc.render({
      annual_save: annualFirst.toFixed(0),
      payback:     (paybackYr || v.life).toFixed(1),
      roi25:       totalSave.toFixed(0),
      net_profit:  net.toFixed(0),
      roi_pct:     roiPct.toFixed(1),
      npv:         npv.toFixed(0)
    });
  }
  KADCalc.init(compute);
})();
