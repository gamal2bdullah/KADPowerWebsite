(function(){
  function compute(){
    const v = KADCalc.values();
    const lossFactor = (1 - v.dust/100) * (1 - v.shading/100);
    const daily   = v.kwp * v.psh * v.pr * lossFactor;
    const monthly = daily * 30;
    const annual  = daily * 365;
    const co2     = annual * 0.85;
    const trees   = co2 / 21;
    const savings = annual * v.tariff;
    KADCalc.render({
      daily:   daily.toFixed(2),
      monthly: monthly.toFixed(0),
      annual:  annual.toFixed(0),
      co2:     co2.toFixed(0),
      trees:   trees.toFixed(0),
      savings: savings.toFixed(0)
    });
  }
  KADCalc.init(compute);
})();
