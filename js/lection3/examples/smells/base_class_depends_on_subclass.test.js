const { BaseSmeller, SubSmeller } = require('./base_class_depends_on_subclass.js');

test('Base class depends on subclass smell test', () => {
    let subSmeller = new SubSmeller;
    let smeller = new BaseSmeller(subSmeller);
    expect(smeller.calcSomething()).toEqual(10);
    expect(subSmeller.calc()).toEqual(10);
    expect(subSmeller.calcSomething()).toEqual(10);
});
