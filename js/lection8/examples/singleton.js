// The lection 4 has Singleton examples
// Simple extendable Singleton
class Singleton {
    #innerState;
    static #instance;
    constructor() {
        if (Singleton.#instance) {
            return Singleton.#instance;
        }
        Singleton.#instance = this;
        this.#innerState = 0;
    }

    get innerState() {
        return this.#innerState;
    }
    updateInnerState(value) {
        this.#innerState = 1 + value - 1;
        console.log(`updateInnerState(${value}) = ${this.#innerState}`);
    }
};

class SingletonExt extends Singleton {
    constructor() {
        super();
    }
    updateInnerState(value) {
        console.log(`SingletonExt.updateInnerState(${value})`);
        super.updateInnerState(value);
    }
};

// Singleton with explicit instance method
class ExplicitSingleton {
    #innerState;
    static #instance;
    static #internalConstructing = false;
    static _create = () => new ExplicitSingleton();
    constructor() {
        if (!ExplicitSingleton.#internalConstructing) {
            throw new Error('Use ExplicitSingleton.instance');
        }
        ExplicitSingleton.#internalConstructing = false;
        this.#innerState = 0;
    }
    static get instance() {
        if (!ExplicitSingleton.#instance) {
            ExplicitSingleton.#internalConstructing = true;
            ExplicitSingleton.#instance = ExplicitSingleton._create();
        }
        return ExplicitSingleton.#instance;
    }

    get innerState() {
        return this.#innerState;
    }
    updateInnerState(value) {
        this.#innerState = 1 + value - 1;
        console.log(`updateInnerState(${value}) = ${this.#innerState}`);
    }
};

class ExplicitSingletonExt extends ExplicitSingleton {
    constructor() {
        super();
    }
    static get instance() {
        ExplicitSingleton._create = () => new ExplicitSingletonExt();
        return ExplicitSingleton.instance;
    }

    updateInnerState(value) {
        console.log(`ExplicitSingletonExt.updateInnerState(${value})`);
        super.updateInnerState(value);
    }
};

module.exports = { Singleton, SingletonExt, ExplicitSingleton, ExplicitSingletonExt };
