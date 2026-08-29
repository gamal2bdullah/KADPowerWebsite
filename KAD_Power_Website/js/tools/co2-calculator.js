(function(){
  function compute(){
    const v = KADCalc.values();
    const annual = v.kwh * v.factor;
    const lifetime = (annual * v.life)/1000;
    const trees = annual / 21;
    const miles = annual / 0.12;
    KADCalc.render({
      annual: annual.toFixed(0),
      lifetime: lifetime.toFixed(2),
      trees: trees.toFixed(0),
      miles: miles.toFixed(0)
    });
  }
  KADCalc.init(compute);
})();
