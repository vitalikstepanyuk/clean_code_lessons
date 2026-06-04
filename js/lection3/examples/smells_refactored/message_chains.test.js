const { Item, Box, Pallet, Container } = require('./message_chains.js');

test('Message chains fix test', () => {
    let container = new Container([new Pallet([new Box(new Item(10)), new Box(new Item(20))]),
        new Pallet([new Box(new Item(30)), new Box(new Item(34.5)), new Box(new Item(15.5))])]);
    expect(container.weight).toEqual(1150);
});
