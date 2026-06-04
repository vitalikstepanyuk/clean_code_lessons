// Optional declaration of common interface
class Component {
    add(component) {}
    remove(index) {}
    child(index) { return null; }
    size() { return 0; }
    operation() {}
};

// Terminal "Leaf" class
class Leaf extends Component {
    operation() {
        console.log("Leaf operation");
    }
};

// Composite non-terminal class with ability to manage childs
class Composite extends Component {
    #components;
    constructor(...components) {
        super();
        this.#components = components;
    }
    add(component) {
        console.log("Composite add child");
        this.#components.push(component);
    }
    remove(index) {
        console.log("Composite remove child");
        if (index < this.components.length) {
            this.#components.splice(index, 1);
        }
    }
    child(index) {
        console.log(`Composite get child ${index}`);
        if (index >= this.#components.length) {
            return this.#components[this.components.length - 1];
        }
        return this.#components[index];
    }
    size() {
        return this.#components.length;
    }
    operation() {
        console.log("Composite operation");
        for (let component of this.#components) {
            component.operation();
        }
    }
};

// Client code that works with components in a uniform way
function clientOperation(component) {
    component.operation();
}

// Helper to create composition tree
function makeComposite(...components) {
    return new Composite(...components);
}

// Optional declaration of narrow component interface focused on actions only without managing childs 
class SimpleComponent {
    operation() {
        console.log("SimpleComponent operation");
    }
};

// Terminal "Leaf" class
class SimpleLeaf extends SimpleComponent {
    operation() {
        console.log("SimpleLeaf operation");
    }
};

// Composite non-terminal class formed with childs without dynamic changes
class SimpleComposite extends SimpleComponent {
    #components;
    constructor(...components) {
        super();
        this.#components = components;
    }

    get components() {
        return this.#components;
    }

    operation() {
        console.log("SimpleComposite operation");
        for (let component of this.#components) {
            component.operation();
        }
    }
};

module.exports = { Component, Leaf, Composite, clientOperation, makeComposite, SimpleComponent, SimpleLeaf, SimpleComposite };
