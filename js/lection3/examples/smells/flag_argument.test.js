const { calculateSmell, checkAndSaveSmell } = require('./flag_argument.js');

test('Flag argument smell test', () => {
    let c = calculateSmell(10, true);
    expect(c).toEqual(5);
    expect(checkAndSaveSmell(c)).toBeTruthy();
});
