const { CloneableDrink, CloneableProduct, CloneableCombo, driveFor, McDonalds, driveIn, PrototypeRegistry, driveAndGet } = require('./prototype.js');

test('test prototype', () => {
    orederPrototype = new CloneableCombo("McChicken Combo", [new CloneableProduct("McChicken burger", "Double", 100), new CloneableProduct("French fries", "Large", 50), new CloneableDrink("Coca-Cola", 500, 50)]);
    lunch = driveFor(orederPrototype);
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, Coca-Cola 500 ml");
});

test('test prototype2', () => {
    lunch = driveIn(new McDonalds());
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, McLatte 300 ml");
});

test('test prototype3', () => {
    prototypes = new PrototypeRegistry();
    prototypes.addPrototype("McLatte", new CloneableDrink("McLatte", 300, 50));
    prototypes.addPrototype("McChicken Combo", new CloneableCombo("McChicken Combo", [new CloneableProduct("McChicken burger", "Double", 100), new CloneableProduct("French fries", "Large", 50), new CloneableDrink("Coca-Cola", 500, 50)]));
    drink = driveAndGet(prototypes, "McLatte");
    expect(drink.description).toEqual("McLatte 300 ml");
    lunch = driveAndGet(prototypes, "McChicken Combo");
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, Coca-Cola 500 ml");
});
