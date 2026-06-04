const { Child } = require('./twin.js');

test('Twin test', () => {
    let child = new Child();
    let result = child.operation();
    expect(result).toEqual('CHLD');
    result = child.otherOperation();
    expect(result).toEqual('TWIN');
});
