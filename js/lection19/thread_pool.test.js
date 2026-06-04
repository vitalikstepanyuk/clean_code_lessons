const OS = require('os')
process.env.UV_THREADPOOL_SIZE = OS.cpus().length

function doSomething(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`doneomething ${value}`);
            resolve(value);
        }, 10);
    });
}

test('Thread pool test', async () => {
    let results = [];
    for (let i = 1; i <= 8; ++i) {
        results.push(doSomething(i));
    }
    for (let result of results) {
        let value = await result;
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(8);
    }
});
