const { SimpleSingleton, SimpleSingletonExt, Singleton, SingletonExt } = require('./singletonitis.js');

function doSomething(value) {
    let instance = new SimpleSingleton();
    let newValue = instance.innerState + value;
    instance.updateInnerState(newValue);
    return instance.innerState;
}

test('Singletonitis test 1', () => {
    let s1 = new SimpleSingletonExt();
    let s2 = new SimpleSingleton();
    expect(s2).toBeInstanceOf(SimpleSingletonExt);
    expect(s1).toBe(s2);
 
    async function test(value) {
        return new Promise((resolve) => {
            for (let i = 0; i < 10; ++i) {
                doSomething(value);
            }
            resolve(true);
        });
    }
    let promises = [test(1), test(-1)];
    Promise.all(promises).then(() => {
        expect(s1.innerState).toBe(0);
    });
});

test('Singletonitis test 2', () => {
    let ext = SingletonExt.instance;
    let s = Singleton.instance;
    expect(s).toBe(ext);
    expect(s).toBeInstanceOf(SingletonExt);
    s.updateInnerState(0);
});
