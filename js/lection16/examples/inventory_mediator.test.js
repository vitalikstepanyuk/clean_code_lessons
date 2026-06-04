const { Backpack, Item, Potion, Machete, Sharpener, Distilator } = require('./inventory_mediator');

test('Inventory mediator test', () => {
    const backpack = new Backpack([
        new Item("flashlight", "flashlight with a weak battery"),
        new Potion(),
        new Item("rope", "rope 20m"),
        new Machete(),
        new Item("lighter", "gas lighter")
    ]);

    let machete = backpack.at(3);
    machete.use();
    expect(machete.state).toBe(95);

    backpack.replace(4, new Sharpener());
    expect(machete.state).toBe(100);

    let potion = backpack.at(1);
    potion.use();
    expect(potion.state).toBe(95);

    backpack.replace(2, new Distilator());
    expect(potion.state).toBe(100);
});
