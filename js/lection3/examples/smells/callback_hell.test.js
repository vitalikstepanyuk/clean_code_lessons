const { CallbackSmeller } = require('./callback_hell.js');

test('Callback hell smell test', () => {
    let smeller = new CallbackSmeller;
    expect(smeller.doSomething(() => {
        console.log("Callback Hell First Callback");
        return smeller.doSomethingElse(() => {
            console.log("Callback Hell Next Callback");
            return smeller.doSomethingElseElse(() => {
                console.log("Callback Hell Last Standing");
                return true;
            });
        });
    })).toBeTruthy();
});
