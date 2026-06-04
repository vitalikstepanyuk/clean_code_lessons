const { AsyncLauncher } = require('./callback_hell.js');

test('Callback hell is not a hell for JS test', () => {
    let launcher = new AsyncLauncher;
    let result1 = launcher.doSomething();
    let result2 = launcher.doSomethingElse();
    let result3 = launcher.doSomethingElseElse();
    let result = true;
    result1.then((r) => result &= r);
    result2.then((r) => result &= r);
    result3.then((r) => result &= r);
    expect(result).toBeTruthy();
});
