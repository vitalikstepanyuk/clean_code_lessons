// Optional common interface declaration
class Component {
    operation() {}
};

// Specific component class
class ConcreteComponent extends Component {
    operation() {
        console.log("ConcreteComponent operation");
    }
};

// Optional Decorator interface declaration that transparent by default
class Decorator extends Component {
    #component;
    constructor(component) {
        super();
        this.#component = component;
    }

    operation() {
        console.log("Decorator operation");
        this.#component.operation();
    }
};

// Specific Decorator classes that add additional behavior to the given component
class SomeDecorator extends Decorator {
    operation() {
        console.log("SomeDecorator operation");
        super.operation();
        this.#someAdditionalBehavior();
    }

    #someAdditionalBehavior() {
        console.log("SomeDecorator someAdditionalBehavior");
    }
};

class OtherDecorator extends Decorator {
    operation() {
        console.log("OtherDecorator operation");
        super.operation();
        this.#otherAdditionalBehavior();
    }

    #otherAdditionalBehavior() {
        console.log("OtherDecorator otherAdditionalBehavior");
    }
};

// Client code that works with components in a uniform way
function clientOperation(component) {
    component.operation();
}

module.exports = { Component, ConcreteComponent, Decorator, SomeDecorator, OtherDecorator, clientOperation };
