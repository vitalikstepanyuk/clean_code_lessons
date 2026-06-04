const { calculateOdd, calculateEven, check, save } = require('./flag_argument.js');

test('Flag argument fix test', () => {
    let c = calculateOdd(10);
    expect(c).toEqual(5);
    expect(calculateEven(c)).toEqual(1);
    expect(check(c)).toBeTruthy();
    expect(save(c)).toBeTruthy();
});
