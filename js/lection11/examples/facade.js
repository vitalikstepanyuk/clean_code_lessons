class SomeComponent {
    #something = 0;
    constructor(something = 0) {
        this.#something = something;
    }

    doSomething(something) {
        console.log(`SomeComponent doSomething with ${something}`);
        this.#something += something;
        return this.#something;
    }

    doSomethingElse(something) {
        console.log(`SomeComponent doSomethingElse with ${something}`);
        if (this.#something === 0) {
            return 0;
        }
        this.#something -= something % this.#something;
        return this.#something;
    }
};

class OtherComponent {
    #otherThing = 0;
    constructor(otherThing = 0) {
        this.#otherThing = otherThing;
    }

    doAnotherThing(otherThing) {
        console.log(`OtherComponent doAnotherThing with ${otherThing}`);
        this.#otherThing *= otherThing;
        return this.#otherThing;
    }

    doYetAnotherThing(otherThing) {
        console.log(`OtherComponent doYetAnotherThing with ${otherThing}`);
        if (this.#otherThing === 0 || otherThing % this.#otherThing === 0) {
            return 0;
        }
        this.#otherThing /= otherThing % this.#otherThing;
        return this.#otherThing;
    }
};

// Facade that hides components and theirs complex usage from the client
class Facade {
    #someComponent;
    #otherComponent;
    constructor(someComponent, otherComponent) {
        this.#someComponent = someComponent;
        this.#otherComponent = otherComponent;
    }

    operation(something) {
        console.log(`Facade operation with ${something}`);
        let value = something;
        value = this.#someComponent.doSomething(value);
        value = this.#otherComponent.doAnotherThing(value);
        value = this.#someComponent.doSomethingElse(value);
        value = this.#otherComponent.doYetAnotherThing(value);
        return value;
    }
};

// Client code that works with Facade and have no idea about other components
function clientOperation(facade, value) {
    return facade.operation(value);
}

module.exports = { SomeComponent, OtherComponent, Facade, clientOperation };
