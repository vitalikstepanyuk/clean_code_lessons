const { Starbucks, MerryBerry, McDonalds, KFC, Subway, driveIn, ParamerizedProductMaker, goTo } = require('./factory_method.js');

test('test factory method', () => {
    drink = driveIn(new Starbucks());
    expect(drink.description).toEqual("Latte 250 ml");
    drink = driveIn(new MerryBerry());
    expect(drink.description).toEqual("Cherry smoothie 350 ml");
    lunch = driveIn(new McDonalds());
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, Coca-Cola 500 ml");
    lunch = driveIn(new KFC());
    expect(lunch.description).toEqual("KFC Bucket Combo with XL bucket Chicken wings, XL Potato wedges, Pepsi 500 ml");
    lunch = driveIn(new Subway());
    expect(lunch.description).toEqual("Subway Combo with Big Subway tuna sandwich, Medium pack Cookies, Sprite 500 ml");
});

test('test parametrized factory method', () => {
    drink = goTo("Starbucks");
    expect(drink.description).toEqual("Latte 250 ml");
    drink = goTo("MerryBerry");
    expect(drink.description).toEqual("Cherry smoothie 350 ml");
    lunch = goTo("McDonalds");
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, Coca-Cola 500 ml");
    lunch = goTo("KFC");
    expect(lunch.description).toEqual("KFC Bucket Combo with XL bucket Chicken wings, XL Potato wedges, Pepsi 500 ml");
    lunch = goTo("Subway");
    expect(lunch.description).toEqual("Subway Combo with Big Subway tuna sandwich, Medium pack Cookies, Sprite 500 ml");
});
