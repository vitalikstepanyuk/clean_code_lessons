// Optional Flyweight interface
class Flyweight {
    operation(extrinsicState) {
        console.log(`Flyweight operation with ${extrinsicState}`);
    }
};

// Specific Flyweight implementation
class ConcreteFlyweight extends Flyweight {
    #intrinsicState;
    #sub;
    constructor(intrinsicState = "") {
        super();
        this.#intrinsicState = intrinsicState;
        this.#sub = this.#intrinsicState.indexOf("{{data}}");
    }

    operation(extrinsicState) {
        console.log(`ConcreteFlyweight operation with ${extrinsicState}`);
        let result = this.#intrinsicState.substring(0, this.#sub) + extrinsicState + this.#intrinsicState.substring(this.#sub + 8);
        console.log(result);
        return result;
    }
};

class UnsharedFlyweight extends Flyweight {
    #state;
    constructor(state = "") {
        super();
        this.#state = state;
    }

    operation(extrinsicState) {
        console.log(`UnsharedFlyweight operation with ${extrinsicState}`);
        let result = this.#state + extrinsicState;
        console.log(result);
        return result;
    }
};

// Flyweight factory that creates and stores flyweights
class FlyweightFactory {
    #flyweights = {};
    constructor(flyweights) {
        this.#flyweights = flyweights;
    }

    getFlyweight(index) {
        return this.#flyweights[index];
    }
};

// Client operation that uses flyweight
function clientOperation(flyweight, context) {
    return flyweight.operation(context);
}

module.exports = { ConcreteFlyweight, UnsharedFlyweight, FlyweightFactory, clientOperation };
