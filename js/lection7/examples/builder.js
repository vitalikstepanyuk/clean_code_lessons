const { Product, DrinkToGo, FastFood, FastFoodCombo } = require('./factory_method.js');
// Products - let it be the same as for Factory Method

// Abstract Builder
class FastLineOrderBuilder {
    makeDrink() { }
    makeMainOffer() { }
    makeSideOffer() { }
    getOrder() { }
};

// Concrete Builders
class McDonalds extends FastLineOrderBuilder {
    #drink;
    #main;
    #side;

    makeDrink() {
        this.#drink = new DrinkToGo("McLatte", 300, 50);
    }

    makeMainOffer() {
        this.#main = new FastFood("McChicken burger", "Double", 100);
    }

    makeSideOffer() {
        this.#side = new FastFood("French fries", "Large", 50);
    }

    getOrder() {
        return new FastFoodCombo("McChicken Combo", [this.#main, this.#side, this.#drink]);
    }
};

class KFC extends FastLineOrderBuilder {
    #drink;
    #main;
    #side;

    makeDrink() {
        this.#drink = new DrinkToGo("Cappuccino beans", 300, 50);
    }

    makeMainOffer() {
        this.#main = new FastFood("Chicken wings", "XL bucket", 150);
    }

    makeSideOffer() {
        this.#side = new FastFood("Potato wedges", "XL", 50);
    }

    getOrder() {
        return new FastFoodCombo("KFC Bucket Combo", [this.#main, this.#side, this.#drink]);
    }
};

class Subway extends FastLineOrderBuilder {
    #drink;
    #main;
    #side;

    makeDrink() {
        this.#drink = new DrinkToGo("Subway coffee", 250, 40);
    }

    makeMainOffer() {
        this.#main = new FastFood("Subway tuna sandwich", "Big", 100);
    }

    makeSideOffer() {
        this.#side = new FastFood("Subway salad", "Medium", 60);
    }

    getOrder() {
        return new FastFoodCombo("Subway Combo", [this.#main, this.#side, this.#drink]);
    }
};

// Director
class FastLineOrderManager {
    #builder;
    constructor(builder) {
        this.#builder = builder;
    }

    makeOrder() {
        this.#builder.makeDrink();
        this.#builder.makeMainOffer();
        this.#builder.makeSideOffer();
    }

    getOrder() {
        return this.#builder.getOrder();
    }
};

// Client
function driveIn(builder) {
    order_manager = new FastLineOrderManager(builder);
    order_manager.makeOrder();
    return order_manager.getOrder();
}

module.exports = { McDonalds, KFC, Subway, driveIn };
