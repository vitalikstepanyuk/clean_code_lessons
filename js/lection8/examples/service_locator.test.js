const { SomeService, OtherService, ServiceLocator } = require('./service_locator');

function doSomething(locator) {
    let service = locator.getService(SomeService);
    service.doSomething();
    let otherService = locator.getService(OtherService);
    otherService.doSomethingElse();
}

function doSomethingDI(service, otherService) {
    service.doSomething();
    otherService.doSomethingElse();
}

test('ServiceLocator test 1', () => {
    let locator = new ServiceLocator();
    locator.registerService(SomeService, new SomeService());
    expect(locator.hasService(SomeService)).toBeTruthy();
    locator.registerService(OtherService, new OtherService());
    expect(locator.hasService(OtherService)).toBeTruthy();

    doSomething(locator);
    doSomethingDI(locator.getService(SomeService), locator.getService(OtherService));

    locator.unregisterService(OtherService);
});
