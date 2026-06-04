const { Mediator, ConcreteColleague } = require('./mediator.js');

test('Mediator test', () => {
    const colleague1 = new ConcreteColleague("Colleague1");
    const colleague2 = new ConcreteColleague("Colleague2");
    const mediator = new Mediator(colleague1, colleague2);

    colleague1.doSomething();
    expect(colleague2.receivedMessage).toBe("Colleague1 did something");
    colleague2.doSomething();
    expect(colleague1.receivedMessage).toBe("Colleague2 did something");
});
