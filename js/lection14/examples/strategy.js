class Strategy {
    execute() { return false; }
};

class ConcreteStrategy1 extends Strategy {
    execute() {
        console.log("ConcreteStrategy1 execute");
        return false;
    }
};

class ConcreteStrategy2 extends Strategy {
    execute() {
        console.log("ConcreteStrategy2 execute");
        return true;
    }
};

class Context {
    #strategy;
    constructor(strategy) {
        this.#strategy = strategy;
    }

    changeStrategy(strategy) {
        this.#strategy = strategy;
    }

    performAction() {
        return this.#strategy.execute();
    }
};

module.exports = { ConcreteStrategy1, ConcreteStrategy2, Context };
