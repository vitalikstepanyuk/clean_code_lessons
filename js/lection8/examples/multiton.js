class Multiton {
    static #register = {};
    #name;
    constructor(name) {
        if (Multiton.#register[name]) {
            return Multiton.#register[name];
        }
        Multiton.#register[name] = this;
        this.#name = name;
    }
    static getInstance(name) {
        return Multiton.#register[name];
    }

    doSomething() {
        console.log(`${this.#name}.doSomething`);
    }
};

class SomeMultiton extends Multiton {
    constructor() {
        super('SomeMultiton');
    }
};

class OtherMultiton extends Multiton {
    constructor() {
        super('OtherMultiton');
    }
};

module.exports = { Multiton, SomeMultiton, OtherMultiton };
