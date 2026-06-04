class Element {
    accept(visitor) { }
};

class ConcreteElementA extends Element {
    #state;
    constructor() {
        super();
        this.#state = 0;
    }
    get stateOfA() {
        return this.#state;
    }
    accept(visitor) {
        this.#state = 0xA;
        visitor.visitConcreteElementA(this);
    }
};

class ConcreteElementB extends Element {
    #visited;
    constructor() {
        super();
        this.#visited = false;
    }
    get stateOfB() {
        return this.#visited? 0xB : 0;
    }
    accept(visitor) {
        this.#visited = true;
        visitor.visitConcreteElementB(this);
    }
};

class Visitor {
    #state;
    constructor() {
        this.#state = 0;
    }
    get state() {
        return this.#state;
    }
    visitConcreteElementA(element) {
        console.log('Visitor visitConcreteElementA');
        this.#state = (element.stateOfA << 4) | (this.#state & 0xF0);
    }

    visitConcreteElementB(element) {
        console.log('Visitor visitConcreteElementB');
        this.#state = (this.#state & 0xF0) | (element.stateOfB & 0xF);
    }
};

module.exports = { ConcreteElementA, ConcreteElementB, Visitor };
