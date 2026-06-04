const { Date, VacationCalendarSmeller } = require('./feature_envy.js');

test('Feature envy fix test', () => {
    let dayoffs = new VacationCalendarSmeller([new Date(2024, 1, 1), new Date(2024, 3, 8), 
        new Date(2024, 5, 1), new Date(2024, 5, 5), new Date(2024, 6, 23), new Date(2024, 6, 28), 
        new Date(2024, 7, 15), new Date(2024, 8, 24), new Date(2024, 10, 1), new Date(2024, 12, 25)]);
    expect(dayoffs.countDayOffs(new Date(2024, 4, 29), new Date(2024, 5, 13))).toEqual(5);
    expect(dayoffs.countDayOffs(new Date(2024, 6, 17), new Date(2024, 7, 1))).toEqual(5);
    expect(dayoffs.countDayOffs(new Date(2024, 8, 19), new Date(2024, 9, 2))).toEqual(4);
});
