const date = require('./date.js');

test('2023, 1 is a 2023-1-1', () => {
    expect(date(2023, 1)).toBe((2023, 1, 1));
});

test('2023, 60 is a 2023-3-1', () => {
    expect(date(2023, 60)).toBe((2023, 3, 1));
});

test('2023, 256 is a 2023-9-13', () => {
    expect(date(2023, 256)).toBe((2023, 9, 13));
});

test('2023, 365 is a 2023-12-31', () => {
    expect(date(2023, 365)).toBe((2023, 12, 31));
});
