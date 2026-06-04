const { ConcreteImplementation, RefinedAbstraction, clientOperation } = require('./bridge.js');

test('Bridge test', () => {
    let impl = new ConcreteImplementation();
    let abstraction = new RefinedAbstraction(impl);

    let result = clientOperation(abstraction);
    expect(result).toEqual('IMPL');
});
