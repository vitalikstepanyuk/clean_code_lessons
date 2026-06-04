const { SomeComponent, OtherComponent, Facade, clientOperation } = require('./facade.js');

test('Facade test', () => {
    const someComponent = new SomeComponent(1);
    const otherComponent = new OtherComponent(2);
    const facade = new Facade(someComponent, otherComponent);
    const result = clientOperation(facade, 3);
    expect(result).toEqual(2);
});
