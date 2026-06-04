class Memento {
    state() {
        return '';
    }
};

class NameMemento extends Memento {
    #state;
    constructor(name) {
        super();
        this.#state = name;
    }
    state() {
        return this.#state;
    }
};

class Originator {
    #placefolder = "Hello, ";
    #name;
    constructor(name) {
        this.#name = name;
    }
    changeName(name) {
        this.#name = name;
    }
    greet() {
        return this.#placefolder + this.#name;
    }

    save() {
        return new NameMemento(this.#name);
    }
    restore(memento) {
        this.#name = memento.state();
    }
};

class Caretaker {
    #originator;
    #mementos;
    constructor(originator) {
        this.#originator = originator;
        this.#mementos = [];
    }

    backup() {
        this.#mementos.push(this.#originator.save());
    }
    undo() {
        if (this.#mementos.length === 0) {
            return;
        }
        this.#originator.restore(this.#mementos.pop());
    }
};

module.exports = { NameMemento, Originator, Caretaker };
