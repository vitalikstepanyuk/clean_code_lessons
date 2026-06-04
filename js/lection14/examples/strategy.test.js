const { ConcreteStrategy1, ConcreteStrategy2, Context } = require('./strategy.js');

test('Strategy test', () => {
    let context = new Context(new ConcreteStrategy1());
    let result = context.performAction();
    expect(result).toBeFalsy();
    
    context.changeStrategy(new ConcreteStrategy2());
    result = context.performAction();
    expect(result).toBeTruthy();
});
