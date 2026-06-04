const { ChickenEggSmeller, OstrichEggSmeller, Chicken, Ostrich } = require('./parallel_inheritance_hierarchies.js');

test('Parallel inheritance hierarchies smell test', () => {
    let chicken = new Chicken;
    let chikenEgg = chicken.layEgg();
    expect(chikenEgg).not.toBeNull();
    let ostrich = new Ostrich;
    let ostrichEgg = ostrich.layEgg();
    expect(ostrichEgg).not.toBeNull();
    expect(chikenEgg.color).toEqual(ostrichEgg.color);
    expect(chikenEgg.weight).not.toEqual(ostrichEgg.weight);
});
