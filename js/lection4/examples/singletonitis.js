class SimpleSingleton {
    #innerState;
    static #instance;
    constructor() {
        if (SimpleSingleton.#instance) {
            return SimpleSingleton.#instance;
        }
        SimpleSingleton.#instance = this;
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

class SimpleSingletonExt extends SimpleSingleton {
    constructor() {
        super();
    }
    updateInnerState(value) {
        console.log(`SimpleSingletonExt.updateInnerState(${value})`);
        super.updateInnerState(value);
    }
};

class Singleton {
    #innerState;
    static #instance;
    static #internalConstructing = false;
    static _create = () => new Singleton();
    constructor() {
        if (!Singleton.#internalConstructing) {
            throw new Error('Use Singleton.instance');
        }
        Singleton.#internalConstructing = false;
        this.#innerState = 0;
    }
    static get instance() {
        if (!Singleton.#instance) {
            Singleton.#internalConstructing = true;
            Singleton.#instance = Singleton._create();
        }
        return Singleton.#instance;
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
    static get instance() {
        Singleton._create = () => new SingletonExt();
        return Singleton.instance;
    }
    updateInnerState(value) {
        console.log(`SingletonExt.updateInnerState(${value})`);
        super.updateInnerState(value);
    }
};

module.exports = { SimpleSingleton, SimpleSingletonExt, Singleton, SingletonExt };
