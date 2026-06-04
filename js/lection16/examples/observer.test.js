const { ConcreteSubject, ConcreteObserver } = require('./observer.js');

test('Observer test', () => {
    const subject = new ConcreteSubject("Subject1");
    const observer1 = new ConcreteObserver(subject, "Observer1");
    const observer2 = new ConcreteObserver(subject, "Observer2");
    
    try {
        subject.doSomething();
        expect(observer1.state).toBe('DONE');
        expect(observer2.state).toBe('DONE');
    } finally {
        subject.detach(observer1);
        subject.detach(observer2);
    }
});
