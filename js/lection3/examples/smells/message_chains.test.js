const { ContainerSmeller, PalletSmeller, BoxSmeller, Item, calcWeight } = require('./message_chains.js');

test('Message chains smell test', () => {
    let smeller = new ContainerSmeller([new PalletSmeller([new BoxSmeller(new Item(10)), new BoxSmeller(new Item(20))]),
        new PalletSmeller([new BoxSmeller(new Item(30)), new BoxSmeller(new Item(34.5)), new BoxSmeller(new Item(15.5))])]);
    expect(calcWeight(smeller)).toEqual(110);
});
