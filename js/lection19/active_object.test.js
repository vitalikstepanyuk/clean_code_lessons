const { ActiveObject } = require('./active_object.js');

test('Active Object test', async () => {
    let activeObject = new ActiveObject();
    let results = [];

    for (let i = 1; i <= 8; ++i) {
        results.push(activeObject.doSomething(i));
    }

    for (let result of results) {
        let value = await result;
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(8);
    }
});
