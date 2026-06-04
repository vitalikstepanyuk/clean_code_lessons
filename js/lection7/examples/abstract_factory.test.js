const { Starbucks, MerryBerry, McDonalds, driveIn } = require('./abstract_factory.js');

test('test abstract factory', () => {
    combo = driveIn(new McDonalds());
    expect(combo.drink.description).toEqual("McLatte 300 ml");
    expect(combo.lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, Orange juice 300 ml");
    combo = driveIn(new Starbucks());
    expect(combo.drink.description).toEqual("Starbucks Latte 250 ml");
    expect(combo.lunch.description).toEqual("Starbucks Lunch with Big Ham & Swiss cheese on baguette, 25g Avocado spread, 75g Chocolate nut bar");
    combo = driveIn(new MerryBerry());
    expect(combo.drink.description).toEqual("MerryBerry Cherry smoothie 350 ml");
    expect(combo.lunch.description).toEqual("MerryBerry Lunch with Large MerryBerry wrap, Medium Greek salad, Big Chocolate muffin");
});
