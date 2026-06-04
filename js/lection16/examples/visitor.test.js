const { ConcreteElementA, ConcreteElementB, Visitor } = require('./visitor.js');

test('Visitor test', () => {
    const elementA = new ConcreteElementA();
    const elementB = new ConcreteElementB();
    const visitor = new Visitor();

    elementA.accept(visitor);
    elementB.accept(visitor);
    expect(visitor.state).toBe(0xAB);
});
