const { Item, Backpack, Tracker, Encourager } = require('./inventory_observer.js');

test('Inventory observer test', () => {
    const backpack = new Backpack([
        new Item("flashlight", "flashlight with a weak battery"),
        new Item("aid kit", "first aid kit"),
        new Item("rope", "rope 20m"),
        new Item("knife", "pocket knife"),
        new Item("lighter", "gas lighter")
    ]);
    const encourager = new Encourager();
    backpack.attach(encourager);
    const tracker = new Tracker();
    backpack.attach(tracker);

    const item = backpack.at(3);

    expect(tracker.count(item.name)).toBe(1);
});
