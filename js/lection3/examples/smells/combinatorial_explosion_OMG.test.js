const { Option1, Option2, Option3, CombinatorialSmeller } = require('./combinatorial_explosion_OMG.js');

test('Combinatorial explosion OMG smell test', () => {
    let smeller = new CombinatorialSmeller(Option1.A, Option2.D, Option3.F);
    expect(smeller.doSomething()).toEqual("A-D-F");
    smeller.shuffle();
    expect(smeller.doSomething()).toEqual("A-E-F");
    smeller.shuffle();
    expect(smeller.doSomething()).toEqual("B-E-F");
});
