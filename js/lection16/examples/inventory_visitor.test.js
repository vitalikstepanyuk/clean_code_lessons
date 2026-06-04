const { Item, Backpack, Machete, Potion, Restorer } = require('./inventory_visitor.js');

test('Inventory visitor test', () => {
    const backpack = new Backpack([
        new Item("flashlight", "flashlight with a weak battery"),
        new Potion(),
        new Item("rope", "rope 20m"),
        new Machete(),
        new Item("lighter", "gas lighter")
    ]);
    let machete = backpack.at(3);
    machete.use();
    machete.sharpen();
    expect(machete.damage).toBe(Machete.DAMAGE);

    while (machete.damage) {
        machete.use();
    }
    expect(machete.damage).toBe(0);

    let potion = backpack.at(1);
    while (potion.mana) {
        potion.conjure();
    }
    expect(potion.mana).toBe(0);

    const restorer = new Restorer();
    for (let i = 0; i < backpack.size(); i++) {
        backpack.at(i).handle(restorer);
    }
    expect(machete.damage).toBe(Machete.DAMAGE);
    expect(potion.mana).toBe(Potion.MANA);
});
