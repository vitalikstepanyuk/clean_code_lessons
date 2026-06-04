const { Multiton, SomeMultiton, OtherMultiton } = require('./multiton.js');

test('Multiton test 1', () => {
    let m1 = new SomeMultiton();
    let m2 = new SomeMultiton();
    expect(m1).toBeInstanceOf(SomeMultiton);
    expect(m1).toBe(m2);
    m1.doSomething();

    let m3 = new OtherMultiton();
    let m4 = new OtherMultiton();
    expect(m3).toBeInstanceOf(OtherMultiton);
    expect(m3).toBe(m4);
    m3.doSomething();

    let m5 = Multiton.getInstance('SomeMultiton');
    expect(m5).toBeInstanceOf(SomeMultiton);
    expect(m5).toBe(m1);

    let m6 = Multiton.getInstance('OtherMultiton');
    expect(m6).toBeInstanceOf(OtherMultiton);
    expect(m6).toBe(m3);
});
