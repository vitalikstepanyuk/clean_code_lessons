const { BaseNormal, SubNormal, SubNormal2, SubNormal2Delegate, SubCalc, SubDoer, SubCalcDoerCombiner } = require('./base_class_depends_on_subclass.js');

test('Base class depends on subclass fix1 test', () => {
    let baseNormal = new BaseNormal;
    expect(baseNormal.calcSomething()).toEqual(10);
    let subNormal = new SubNormal;
    expect(subNormal.calcSomething()).toEqual(10);
    subNormal.doSomething();
});

test('Base class depends on subclass fix2 test', () => {
    let subNormal = new SubNormal2;
    expect(subNormal.calcSomething()).toEqual(20);

    let subDelegate = new SubNormal2Delegate(subNormal);
    expect(subDelegate.calcSomething()).toEqual(20);
    subDelegate.doSomething();
});

test('Base class depends on subclass fix3 test', () => {
    let calcNormal = new SubCalc;
    let doNormal = new SubDoer;
    let subDelegate = new SubCalcDoerCombiner(calcNormal, doNormal);
    expect(subDelegate.calc.calcSomething()).toEqual(20);
    subDelegate.doer.doSomething();
});
