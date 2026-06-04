class SomeEgg {
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

class ChickenEggSmeller extends SomeEgg {
    constructor() {
        super(0.075);
    }
    // what to override?
};

class OstrichEggSmeller extends SomeEgg {
    constructor() {
        super(1.5);
    }
    // what to override?
};

class SomeMaBird {
    layEgg() {
        return new SomeEgg(0.05);
    }
};

class Chicken extends SomeMaBird {
    layEgg() {
        return new ChickenEggSmeller();
    }
};

class Ostrich extends SomeMaBird {
    layEgg() {
        return new OstrichEggSmeller();
    }
};

module.exports = { ChickenEggSmeller, OstrichEggSmeller, Chicken, Ostrich };
