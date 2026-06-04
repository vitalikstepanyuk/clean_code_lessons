const { ConcreteComponent, SomeDecorator, OtherDecorator, clientOperation } = require('./decorator.js');

test('Decorator test', () => {
    const component = new ConcreteComponent();
    const decorator = new SomeDecorator(component);
    expect(component).not.toBeInstanceOf(SomeDecorator);
    clientOperation(decorator);

    const sequentialDecorator = new OtherDecorator(decorator);
    clientOperation(sequentialDecorator);
});
