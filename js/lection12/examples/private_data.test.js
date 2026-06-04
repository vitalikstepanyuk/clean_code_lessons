const { MainClass } = require('./private_data.js');

test('Private class data test', () => {
    let mainClass = new MainClass(10, "Hello");
    expect(mainClass.data.someData).toEqual(10);
    let result = mainClass.operation();
    expect(result).toEqual(50);
});
