const { Egg, DecorativeEgg, Chicken, Ostrich } = require('./parallel_inheritance_hierarchies.js');

test('Parallel inheritance hierarchies fix test', () => {
    let chicken = new Chicken();
    let chikenEgg = chicken.layEgg();
    expect(chikenEgg).not.toBeNull();
    let ostrich = new Ostrich();
    let ostrichEgg = ostrich.layEgg();
    expect(ostrichEgg).not.toBeNull();
    expect(chikenEgg.color).toEqual(ostrichEgg.color);
    let pyssanka = new DecorativeEgg("wood", 0.1, "yellow");
    expect(pyssanka.material).toEqual("wood");
});
