const { Leaf, Composite, clientOperation, makeComposite, SimpleLeaf, SimpleComposite } = require('./composite.js');

test('Composite test', () => {
    const composite1 = new Composite();
    composite1.add(new Leaf());
    composite1.add(new Leaf());
    expect(composite1.size()).toEqual(2);
    clientOperation(composite1);

    const composite2 = new Composite();
    composite2.add(new Leaf());
    composite2.add(composite1);
    clientOperation(composite2);

    const composite3 = makeComposite(new Leaf(), makeComposite(new Leaf(), new Leaf()));
    clientOperation(composite3);
});

test('Simple Composite test', () => {
    const simpleComposite = new SimpleComposite(new SimpleLeaf(), new SimpleComposite(new SimpleLeaf(), new SimpleLeaf()));
    expect(simpleComposite.components.length).toEqual(2);
    clientOperation(simpleComposite);
});
