const { Product, Cart } = require('./cart.js');

test('Cart test', () => {
    let cart = new Cart ();
    cart.add(new Product("bread", "toast bread", 40*100, 3), 1);
    cart.add(new Product("milk", "milk 3.2%", 50*100), 2);
    cart.add(new Product("beer", "non-alcohol beer", 40*100), 6);
    let total = cart.total;
    expect(total).toEqual(46060);
    console.log(`Total: ${Math.floor(total/100)}.${total%100} uah`);
});
