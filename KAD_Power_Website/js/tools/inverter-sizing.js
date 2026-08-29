(function(){
  function compute(){
    const v = KADCalc.values();
    const rated  = (v.peak_load * v.growth) / 1000;
    const surge  = (v.peak_load * v.surge) / 1000;
    const dcRatio= v.array_w / (rated * 1000);
    const maxPv  = (rated * 1300) / 1000; // typical DC/AC oversizing 1.3
    KADCalc.render({
      rated:  rated.toFixed(2),
      surge_w: surge.toFixed(2),
      dc_ratio: dcRatio.toFixed(2),
      max_pv:  maxPv.toFixed(2)
    });
  }
  KADCalc.init(compute);
})();
