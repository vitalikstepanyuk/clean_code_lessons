class Observer {
    update() { }
};

class Subject {
    #observers;
    constructor() {
        this.#observers = [];
    }
    attach(observer) {
        if (!this.#observers.includes(observer)) {
            this.#observers.push(observer);
        }
    }
    detach(observer) {
        this.#observers = this.#observers.filter(item => item !== observer);
    }
    notify() {
        this.#observers.forEach(observer => observer.update());
    }
};

class ConcreteSubject extends Subject {
    #name;
    #state;
    constructor(name) {
        super();
        this.#name = name;
        this.#state = 'NONE';
    }

    doSomething() {
        console.log("ConcreteSubject::doSomething");
        this.#state = 'DONE';
        this.notify();
    }

    get name() {
        return this.#name;
    }
    get state() {
        return this.#state;
    }
};

class ConcreteObserver extends Observer {
    #subject;
    #name;
    #state;
    constructor(subject, name) {
        super();
        this.#subject = subject;
        this.#name = name;
        this.#state = 'NONE';
        this.#subject.attach(this);
    }

    update() {
        console.log("ConcreteObserver::update: " + this.#name + " is updated by " + this.#subject.name);
        this.#state = this.#subject.state;
    }

    get state() {
        return this.#state;
    }
};

module.exports = { Subject, ConcreteSubject, ConcreteObserver }; 
