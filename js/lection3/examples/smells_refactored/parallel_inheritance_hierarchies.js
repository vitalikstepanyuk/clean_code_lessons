class Egg {
    #weight;
    #color;
    constructor(weight, color = "white") {
        this.#weight = weight;
        this.#color = color;
    }
    get weight() { return this.#weight; }
    get color() { return this.#color; }
    //...
};

class DecorativeEgg extends Egg {
    #material;
    constructor(material, weight, color) {
        super(weight, color);
        this.#material = material;
    }
    get material() { return this.#material; }
};

class SomeMaBird {
    layEgg() {
        return new Egg(0.05);
    }
};

class Chicken extends SomeMaBird {
    layEgg() {
        return new Egg(0.09);
    }
};

class Ostrich extends SomeMaBird {
    layEgg() {
        return new Egg(1.5);
    }
};

// Collapse Hierarchy

module.exports = { Egg, DecorativeEgg, Chicken, Ostrich };
