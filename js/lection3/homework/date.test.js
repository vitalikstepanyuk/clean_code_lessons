const { date, CalendarDate, Year } = require('./date.js');

// Original tests used `toBe((2023, 1, 1))`, which the comma operator collapses
// to `toBe(1)`. They are rewritten to assert the real YYYY-MM-DD output.

test('2023, 1 is 2023-01-01', () => {
    expect(date(2023, 1)).toBe('2023-01-01');
});

test('2023, 60 is 2023-03-01', () => {
    expect(date(2023, 60)).toBe('2023-03-01');
});

test('2023, 256 is 2023-09-13', () => {
    expect(date(2023, 256)).toBe('2023-09-13');
});

test('2023, 365 is 2023-12-31', () => {
    expect(date(2023, 365)).toBe('2023-12-31');
});

// Leap-year handling: 2024 is a leap year, so day 256 shifts by one day.
test('2024, 256 is 2024-09-12 (leap year)', () => {
    expect(date(2024, 256)).toBe('2024-09-12');
});

test('2024, 366 is 2024-12-31 (last day of a leap year)', () => {
    expect(date(2024, 366)).toBe('2024-12-31');
});

test('Year knows leap years', () => {
    expect(new Year(2024).isLeap()).toBe(true);
    expect(new Year(2023).isLeap()).toBe(false);
    expect(new Year(1900).isLeap()).toBe(false);
    expect(new Year(2000).isLeap()).toBe(true);
});

test('out-of-range day throws', () => {
    expect(() => date(2023, 0)).toThrow(RangeError);
    expect(() => date(2023, 366)).toThrow(RangeError);
});

test('CalendarDate can be built directly', () => {
    expect(CalendarDate.fromDayOfYear(2023, 256).toString()).toBe('2023-09-13');
});
