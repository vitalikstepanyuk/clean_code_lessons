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

class DivergentWorkflowSmeller {
    #something;
    constructor() {
        this.#something = null;
    }
    get something() { 
        return this.#something;
    }

    static obtainSomethingSmell() {
        /*...obtaining something */
        return new Something();
    }
    recalcSomethingSmell(something) {
        /*...modify something */ 
        something.recalc();
        this.#something = something
    }

    someWorkflowTemplate() {
        this.recalcSomethingSmell(DivergentWorkflowSmeller.obtainSomethingSmell());
        return this.something.value != 0;
    }
};

module.exports = { Something, DivergentWorkflowSmeller };
