const { NaiveStateMachine, StateMachine } = require('./combinatorial_explosion_OMG.js');

test('Combinatorial explosion OMG fix test', () => {
    let omg = new NaiveStateMachine();
    expect(omg.state.constructor.name).toEqual('StateNull');
    omg.next();
    expect(omg.state.constructor.name).toEqual('StateADF');
    omg.state.doSomething();
    omg.next();
    expect(omg.state.constructor.name).toEqual('StateAEF');
    omg.state.doSomething();
    for (let i = 0; i < 17; i++) {
        omg.next();
        omg.state.doSomething();
    }
    expect(omg.state.constructor.name).toEqual('StateNull');
});

test('Combinatorial explosion OMG fix test 2', () => {
    let fsm = new StateMachine();
    expect(fsm.index).toEqual('StateNull');
    fsm.switchTo('StateADF');
    expect(fsm.index).toEqual('StateADF');
    fsm.run();
    expect(fsm.index).toEqual('StateAEH');
    fsm.switchTo('StateAEG');
    expect(fsm.index).toEqual('StateAEG');
    fsm.run();
    expect(fsm.index).toEqual('StateNull');
});
