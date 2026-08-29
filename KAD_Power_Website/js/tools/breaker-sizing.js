(function(){
  function compute(){
    const v = KADCalc.values();
    const sizes = [6,10,16,20,25,32,40,50,63,80,100,125,160,200,250];
    const calc = v.in * v.k;
    const size = sizes.find(s => s >= calc) || sizes[sizes.length-1];
    const fuse = sizes.find(s => s >= v.in * 1.15) || sizes[sizes.length-1];
    const kA = v.v <= 60 ? 6 : (v.v <= 240 ? 10 : 25);
    KADCalc.render({size: size, fuse: fuse, kA: kA});
  }
  KADCalc.init(compute);
})();
