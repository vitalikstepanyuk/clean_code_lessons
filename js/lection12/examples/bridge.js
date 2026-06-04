// Check Dancer.js as an additional example

class Implementation {
    operationImpl() {
        throw new Error('operationImpl must be specified in subclass');
    }
};

class ConcreteImplementation extends Implementation {
    operationImpl() {
        console.log("ConcreteImplementation operationImpl");
        return 'IMPL';
    }
};

class Abstraction {
    #impl;
    constructor(impl) {
        this.#impl = impl;
    }

    operation() {
        console.log("Abstraction operation");
        return this.#impl.operationImpl();
    }
};

class RefinedAbstraction extends Abstraction {
    constructor(impl) {
        super(impl);
    }

    operation() {
        console.log("RefinedAbstraction operation");
        return super.operation();
    }
};

function clientOperation(abstraction) {
    return abstraction.operation();
}

module.exports = { Implementation, ConcreteImplementation, RefinedAbstraction, clientOperation };
