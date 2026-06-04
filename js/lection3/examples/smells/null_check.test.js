const { SomeCheckSmeller } = require('./null_check.js');

test('Null check smell test', () => {
    let smeller = SomeCheckSmeller.getSmeller();
    if (smeller != null) {
        expect(smeller.doSomething()).toBeTruthy();
    }
});
