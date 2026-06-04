const { McDonalds, KFC, Subway, driveIn } = require('./builder.js');

test('test builder', () => {
    lunch = driveIn(new McDonalds());
    expect(lunch.description).toEqual("McChicken Combo with Double McChicken burger, Large French fries, McLatte 300 ml");
    lunch = driveIn(new KFC());
    expect(lunch.description).toEqual("KFC Bucket Combo with XL bucket Chicken wings, XL Potato wedges, Cappuccino beans 300 ml");
    lunch = driveIn(new Subway());
    expect(lunch.description).toEqual("Subway Combo with Big Subway tuna sandwich, Medium Subway salad, Subway coffee 250 ml");
});
