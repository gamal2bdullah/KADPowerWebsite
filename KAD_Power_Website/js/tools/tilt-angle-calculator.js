(function(){
  function compute(){
    const v = KADCalc.values();
    const lat = Math.abs(v.lat);
    let year, winter, summer;
    if (lat < 25)      { year = lat * 0.87;          winter = lat + 19; summer = lat - 17; }
    else if (lat < 50) { year = lat * 0.76 + 3.1;    winter = lat + 15; summer = lat - 15; }
    else               { year = lat * 0.5 + 14.7;    winter = lat + 14; summer = lat - 12; }
    let opt;
    if (v.season === 'winter') opt = winter;
    else if (v.season === 'summer') opt = summer;
    else opt = year;
    const gain = ((Math.cos((lat - opt)*Math.PI/180) / Math.cos(lat*Math.PI/180)) - 1) * 100;
    KADCalc.render({
      opt_year:   year.toFixed(1),
      opt_winter: winter.toFixed(1),
      opt_summer: Math.max(0,summer).toFixed(1),
      yield_gain: gain.toFixed(1),
      azimuth:    v.hemi === 'n' ? '0° (جنوب)' : '180° (شمال)'
    });
  }
  KADCalc.init(compute);
})();
