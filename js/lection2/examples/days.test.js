const { GregorianDate } = require('./days.js');

test('1582-1-1 is corrected to the calendar beginning', () => {
    let [date, valid] = GregorianDate.createFromString('1582-1-1');
    expect(date).toEqual(GregorianDate.begin);
    expect(valid).toBeFalsy();
});

test('2024-1-1 is the first day of year', () => {
    let [date,] = GregorianDate.create(2024, 1, 1);
    expect(date.dayOfYear).toEqual(1);
    expect(date.day).toEqual(1);
    expect(date.month).toEqual(1);
    expect(date.year).toEqual(2024);
});

test('2024-2-29 to be 60 day of year', () => {
    let [date1,] = GregorianDate.createFromString('2024-02-29');
    let [date2, valid] = GregorianDate.create(2024, 2, 30);
    expect(date1).toEqual(date2);
    expect(valid).toBeFalsy();
    expect(date2.dayOfYear).toEqual(60);
    expect(date2.day).toEqual(29);
    expect(date2.month).toEqual(2);
    expect(date2.year).toEqual(2024);
});

test('2024-3-1 to be 61 day of year', () => {
    let [date,] = GregorianDate.create(2024, 3, 1);
    expect(date.dayOfYear).toEqual(61);
    expect(date.day).toEqual(1);
    expect(date.month).toEqual(3);
    expect(date.year).toEqual(2024);
});
