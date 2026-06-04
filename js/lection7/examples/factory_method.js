// Products
class Product {
    #name;
    #description;
    #price;
    constructor(name, description, price) {
        this.#name = name;
        this.#description = description;
        this.#price = price;
    }

    get name() { return this.#name; }
    get description() { return this.#description; }
    get price() { return this.#price; }
};

class DrinkToGo extends Product {
    #volume;
    constructor(name, volume, price) {
        super(name, `${name} ${volume} ml`, price);
        this.#volume = volume;
    }

    get volume() { return this.#volume; }
};

class FastFood extends Product {
    #size;
    constructor(name, size, price) {
        super(name, `${size} ${name}`, price);
        this.#size = size;
    }

    get size() { return this.#size; }
};

class FastFoodCombo extends Product {
    #components = [];
    constructor(name, components) {
        let containing = components.map(c => c.description).join(", ");
        let totalPrice = components.reduce((acc, c) => acc + c.price, 0);
        super(name, `${name} with ${containing}`, totalPrice);
        this.#components = components;
    }

    get components() { return this.#components; }
};

// Creators
class FastLineProductMaker {
    makeOrder() { }
};

class Starbucks extends FastLineProductMaker {
    makeOrder() {
        return new DrinkToGo("Latte", 250, 50);
    }
};

class MerryBerry extends FastLineProductMaker {
    makeOrder() {
        return new DrinkToGo("Cherry smoothie", 350, 75);
    }
};

class McDonalds extends FastLineProductMaker {
    makeOrder() {
        return new FastFoodCombo("McChicken Combo", [new FastFood("McChicken burger", "Double", 100), new FastFood("French fries", "Large", 50), new DrinkToGo("Coca-Cola", 500, 50)]);
    }
};

class KFC extends FastLineProductMaker {
    makeOrder() {
        return new FastFoodCombo("KFC Bucket Combo", [new FastFood("Chicken wings", "XL bucket", 150), new FastFood("Potato wedges", "XL", 50), new DrinkToGo("Pepsi", 500, 50)]);
    }
};

class Subway extends FastLineProductMaker {
    makeOrder() {
        return new FastFoodCombo("Subway Combo", [new FastFood("Subway tuna sandwich", "Big", 90), new FastFood("Cookies", "Medium pack", 60), new DrinkToGo("Sprite", 500, 50)]);
    }
};

// Client
function driveIn(fastline) {
    return fastline.makeOrder();
}

// Parametrized Factory Method
class ParamerizedProductMaker {
    static makeOrder(maker) {
        switch (maker) {
            case "Starbucks":
                return new DrinkToGo("Latte", 250, 50);
            case "MerryBerry":
                return new DrinkToGo("Cherry smoothie", 350, 75);
            case "McDonalds":
                return new FastFoodCombo("McChicken Combo", [new FastFood("McChicken burger", "Double", 100), new FastFood("French fries", "Large", 50), new DrinkToGo("Coca-Cola", 500, 50)]);
            case "KFC":
                return new FastFoodCombo("KFC Bucket Combo", [new FastFood("Chicken wings", "XL bucket", 150), new FastFood("Potato wedges", "XL", 50), new DrinkToGo("Pepsi", 500, 50)]);
            case "Subway":
                return new FastFoodCombo("Subway Combo", [new FastFood("Subway tuna sandwich", "Big", 90), new FastFood("Cookies", "Medium pack", 60), new DrinkToGo("Sprite", 500, 50)]);
            default:
                throw new Error("Invalid maker");
        }
    }
};

// Client
function goTo(restaurant) {
    return ParamerizedProductMaker.makeOrder(restaurant);
}

module.exports = { Product, DrinkToGo, FastFood, FastFoodCombo, FastLineProductMaker, Starbucks, MerryBerry, McDonalds, KFC, Subway, driveIn, ParamerizedProductMaker, goTo };
