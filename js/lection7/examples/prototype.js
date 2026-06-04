const { DrinkToGo, FastFood, FastFoodCombo, FastLineProductMaker } = require('./factory_method.js');
// Products - let it be the same as for Factory Method

/// Concrete Prototypes - Cloneable Products. Reuse products from Factory Method
class CloneableProduct extends FastFood {
    constructor(name, size, price) {
        super(name, size, price);
    }

    clone() {
        return new FastFood(this.name, this.size, this.price);
    }
};

class CloneableDrink extends DrinkToGo {
    constructor(name, volume, price) {
        super(name, volume, price);
    }

    clone() {
        return new DrinkToGo(this.name, this.volume, this.price);
    }
};

class CloneableCombo extends FastFoodCombo {
    constructor(name, components) {
        super(name, components);
    }

    clone() {
        return new FastFoodCombo(this.name, this.components.map(component => component.clone()));
    }
};

// Client
function driveFor(prototype) {
    return prototype.clone();
}

class McDonalds extends FastLineProductMaker {
    #fastlinePrototype;
    constructor() {
        super();
        this.#fastlinePrototype = new CloneableCombo("McChicken Combo", [new CloneableProduct("McChicken burger", "Double", 100), new CloneableProduct("French fries", "Large", 50), new CloneableDrink("McLatte", 300, 50)]);
    }

    changeOffer(newOffer) {
        this.#fastlinePrototype = newOffer;
    }

    makeOrder() {
        return this.#fastlinePrototype.clone();
    }
};

// Client
function driveIn(fastline) {
    return fastline.makeOrder();
}

class PrototypeRegistry {
    #prototypes = {};
    addPrototype(name, prototype) {
        this.#prototypes[name] = prototype;
    }
    getPrototype(name) {
        return this.#prototypes[name].clone();
    }
};

// Client
function driveAndGet(registry, name) {
    return registry.getPrototype(name);
}

module.exports = { CloneableDrink, CloneableProduct, CloneableCombo, driveFor, McDonalds, driveIn, PrototypeRegistry, driveAndGet };
