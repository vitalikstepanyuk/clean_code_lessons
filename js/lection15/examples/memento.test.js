const { NameMemento, Originator, Caretaker } = require('./memento.js');

test('Memento test', () => {
    const originator = new Originator("John");
    expect(originator.greet()).toBe("Hello, John");

    const caretaker = new Caretaker(originator);
    caretaker.backup();

    originator.changeName("William");
    expect(originator.greet()).toBe("Hello, William");
    
    caretaker.undo();
    expect(originator.greet()).toBe("Hello, John");
});
