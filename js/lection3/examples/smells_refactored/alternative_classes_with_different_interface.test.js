const { SomethingAdditional, SomethingExtra } = require('./alternative_classes_with_different_interface.js');

test('Alternative classes with different interfaces fix test', () => {
    let something1 = new SomethingAdditional;
    expect(something1.doSomething()).toBeTruthy();
    expect(something1.doSomeOtherThing()).toBeTruthy();
    expect(something1.doSomeYetAnotherThing()).toBeTruthy();

    let something2 = new SomethingExtra;
    expect(something2.doSomething()).toBeTruthy();
    expect(something2.doSomeOtherThing()).toBeTruthy();
});
