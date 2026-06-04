const { ConcreteFlyweight, UnsharedFlyweight, FlyweightFactory, clientOperation } = require('./flyweight.js');

test('Flyweight test', () => {
    const factory = new FlyweightFactory({
        'HTML': new ConcreteFlyweight('<!DOCTYPE html><html lang="en"><head><title>Tile</title><meta charset="UTF-8"/></head><body><div>{{data}}</div><body></html>'),
        'JSON': new ConcreteFlyweight('{ status: success, data: {{data}} }')
    });

    clientOperation(factory.getFlyweight('HTML'), 'Hello, HTML!');
    let constructed = clientOperation(factory.getFlyweight('JSON'), "'Hello, JSON!'");
    expect(constructed).toEqual("{ status: success, data: 'Hello, JSON!' }");
    constructed = clientOperation(factory.getFlyweight('JSON'), "'Hello again!'");
    expect(constructed).toEqual("{ status: success, data: 'Hello again!' }");

    const unique = new UnsharedFlyweight('unique');
    constructed = clientOperation(unique, '!!!');
    expect(constructed).toEqual('unique!!!');
});
