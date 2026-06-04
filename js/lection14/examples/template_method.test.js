const { ConcreteClass1, ConcreteClass2 } = require('./template_method.js');

test('Template Method test', () => {
    let concrete1 = new ConcreteClass1();
    let result = concrete1.templateMethod();
    expect(result).toBeFalsy();

    let concrete2 = new ConcreteClass2();
    result = concrete2.templateMethod();
    expect(result).toBeTruthy();
});
