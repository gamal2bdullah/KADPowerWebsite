(function(){
  function compute(){
    const v = KADCalc.values();
    // Voc at min temp
    const dT = 25 - v.tmin;
    const vocCold = v.voc * (1 + (v.tc_voc/100) * (-dT)); // tc_voc is negative
    // max series so vocCold*N <= mppt_max
    const seriesMax = Math.floor(v.mppt_max / vocCold);
    // min series so vmp*N >= mppt_min
    const seriesMin = Math.ceil(v.mppt_min / v.vmp);
    const series = Math.max(seriesMin, Math.min(seriesMax, Math.round((seriesMax+seriesMin)/2)));
    const panelsNeeded = Math.ceil((v.target_kw*1000) / v.pmax);
    const parallel = Math.max(1, Math.ceil(panelsNeeded / series));
    const total = series * parallel;
    KADCalc.render({
      series: series,
      parallel: parallel,
      total: total,
      voc_str: (vocCold * series).toFixed(1),
      vmp_str: (v.vmp * series).toFixed(1),
      isc_arr: (v.isc * parallel).toFixed(2),
      kw_actual: ((total * v.pmax)/1000).toFixed(2)
    });
  }
  KADCalc.init(compute);
})();
