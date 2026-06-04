const { Singleton, SingletonExt, ExplicitSingleton, ExplicitSingletonExt } = require('./singleton.js');

function doSomething(value) {
    let instance = new Singleton();
    let newValue = instance.innerState + value;
    instance.updateInnerState(newValue);
    return instance.innerState;
}

test('Singleton test 1', () => {
    let ext = new SingletonExt();
    let s = new Singleton();
    expect(s).toBeInstanceOf(SingletonExt);
    expect(s).toBe(ext);
 
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
        expect(s.innerState).toBe(0);
    });
});

test('Singleton test 2', () => {
    let ext = ExplicitSingletonExt.instance;
    let s = ExplicitSingleton.instance;
    expect(s).toBeInstanceOf(ExplicitSingletonExt);
    expect(s).toBe(ext);
    s.updateInnerState(0);
});
