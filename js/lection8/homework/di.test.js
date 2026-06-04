const { BasicSettings, gameEmulation } = require('./di.js');

test('DI test', () => {
    expect(BasicSettings.option1()).toBeTruthy();

    gameEmulation();
});
