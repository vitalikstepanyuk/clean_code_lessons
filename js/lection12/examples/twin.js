class Parent {
    operation() {
        console.log("Parent operation");
        return 'PARN';
    }
};

class OtherParent {
    otherOperation() {
        console.log("OtherParent otherOperation");
        return 'OTHR';
    }
};

// Twin class that uses two instances of each other. Child creates OtherChild as a twin
class Child extends Parent {
    #twin;
    constructor() {
        super();
        this.#twin = new OtherChild(this);
    }

    operation() {
        console.log("Child operation");
        super.operation();
        return 'CHLD';
    }

    otherOperation() {
        console.log("Child otherOperation");
        return this.#twin.otherOperation();
    }
};

// Twin class. OtherChild refers to Child as a twin
class OtherChild extends OtherParent {
    #twin;
    constructor(child) {
        super();
        this.#twin = child;
    }

    operation() {
        console.log("OtherChild operation");
        return this.#twin.operation();
    }

    otherOperation() {
        console.log("OtherChild otherOperation");
        super.otherOperation();
        return 'TWIN';
    }
};

module.exports = { Parent, OtherParent, Child, OtherChild };
