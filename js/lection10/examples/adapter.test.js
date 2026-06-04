const { Adaptee, Adapter, ClassAdapter, clientRequest, ConcreteTarget, ExtendedAdapter, extendedClientRequest, Car, RoboticAdapter, clientDriveBy } = require('./adapter.js');

test('Adapter test', () => {
    const adaptee = new Adaptee();
    const adapter = new Adapter(adaptee);
    expect(adaptee).not.toBeInstanceOf(Adapter);
    clientRequest(adapter);

    const classAdapter = new ClassAdapter();
    clientRequest(classAdapter);
    expect(classAdapter.request()).toEqual('{code: success}');
});

test('Extended Adapter test', () => {
    const concreteTarget = new ConcreteTarget();
    const extendedAdapter = new ExtendedAdapter(concreteTarget);
    expect(concreteTarget).not.toBeInstanceOf(ExtendedAdapter);
    clientRequest(extendedAdapter);

    const adaptee = new Adaptee();
    const adapter = new Adapter(adaptee);
    const sequentialAdapter = new ExtendedAdapter(adapter);
    extendedClientRequest(sequentialAdapter);
});

test('RoboticCar Adapter test', () => {
    const car = new Car();
    const roboticAdapter = new RoboticAdapter(car);
    expect(car).not.toBeInstanceOf(RoboticAdapter);
    const coords = clientDriveBy(roboticAdapter, {x: 46487946, y: 30740796});
    expect(coords).toEqual({x: 46487946, y: 30740796});
});
