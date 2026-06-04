const { SomeSmeller, SomeOtherSmeller } = require('./alternative_classes_with_different_interfaces.js');

test('Alternative classes with different interfaces smell test', () => {
    let smeller = new SomeSmeller;
    expect(smeller.doSomeSmell()).toBeTruthy();
    expect(smeller.doSomeOtherSmell()).toBeTruthy();

    let otherSmeller = new SomeOtherSmeller;
    expect(otherSmeller.doSomeSimillarSmell()).toBeTruthy();
    expect(otherSmeller.doSomeOtherSimillarSmell()).toBeTruthy();
});
