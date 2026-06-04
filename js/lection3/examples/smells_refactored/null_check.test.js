const { DefaultCheck, SomeCheck } = require('./null_check.js');

test('Null check fix test', () => {
    let checker = SomeCheck.getCheck();
    expect(checker).not.toBeNull();
    checker.doSomething();
});
