class Something {
    #value;
    constructor() {
        this.#value = 0;
    }
    get value() {
        return this.#value;
    }
    recalc() {
        this.#value = 10;
    }
};

class SomeProvider { // Or Object Pool
    static obtainSomething() { // Non-static member function in case of implementing the Object Pool pattern
        /*...obtaining something */
        return new Something();
    }
};

class SomeChanger {
    #something;
    constructor(something) {
        this.#something = something;
        /*...modify something */ 
        this.#something.recalc();
    }
    get something() { 
        return this.#something;
    }
};

class SomeWorkflowTemplate {
    #something;
    constructor() {
        this.#something = new SomeChanger(SomeProvider.obtainSomething()).something;
    }
    get something() { 
        return this.#something;
    }
};

// Extract Class
// Replace Method with Method Object

module.exports = { Something, SomeProvider, SomeChanger, SomeWorkflowTemplate };
