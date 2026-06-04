const { DrinkToGo, FastFood, FastFoodCombo } = require('./factory_method.js');
// Products - let it be the same as for Factory Method

// Abstract Factory
class FastLineProductFactory {
    makeDrink() { }
    makeLunch() { }
};

class Starbucks extends FastLineProductFactory {
    makeDrink() {
        return new DrinkToGo("Starbucks Latte", 250, 50);
    }
    makeLunch() {
        return new FastFoodCombo("Starbucks Lunch", 
            [new FastFood("Ham & Swiss cheese on baguette", "Big", 100), 
            new FastFood("Avocado spread", "25g", 50), 
            new FastFood("Chocolate nut bar", "75g", 40)]);
    }
};

class MerryBerry extends FastLineProductFactory {
    makeDrink() {
        return new DrinkToGo("MerryBerry Cherry smoothie", 350, 70);
    }
    makeLunch() {
        return new FastFoodCombo("MerryBerry Lunch", 
            [new FastFood("MerryBerry wrap", "Large", 120), 
            new FastFood("Greek salad", "Medium", 80), 
            new FastFood("Chocolate muffin", "Big", 60)]);
    }
};

class McDonalds extends FastLineProductFactory {
    makeDrink() {
        return new DrinkToGo("McLatte", 300, 50);
    }
    makeLunch() {
        return new FastFoodCombo("McChicken Combo", 
            [new FastFood("McChicken burger", "Double", 100), 
            new FastFood("French fries", "Large", 50), 
            new DrinkToGo("Orange juice", 300, 50)]);
    }
};

function driveIn(factory) {
    return {
        drink: factory.makeDrink(),
        lunch: factory.makeLunch()
    };
}

module.exports = { Starbucks, MerryBerry, McDonalds, driveIn };
