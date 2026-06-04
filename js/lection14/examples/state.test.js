const { ConcreteState1, ConcreteState2, Context } = require('./state.js');

test('State test', () => {
    let context = new Context(new ConcreteState1());
    context.request1();
    expect(context.stateCode).toEqual('CST2');
    context.request2();
    expect(context.stateCode).toEqual('CST1');
    context.request2();
    expect(context.stateCode).toEqual('CST1');
    context.request1();
    expect(context.stateCode).toEqual('CST2');
});
