const { SpecificObject, Proxy, ProtectionProxy, LoggingProxy, CachingProxy, VirtualProxy, clientRequest } = require('./proxy.js');

test('Proxy test', () => {
    const specificObject = new SpecificObject();
    const proxy = new Proxy(specificObject);
    expect(specificObject).not.toBeInstanceOf(Proxy);
    clientRequest(proxy);

    const protectionProxy = new ProtectionProxy(specificObject);
    clientRequest(protectionProxy);

    const loggingProxy = new LoggingProxy(specificObject);
    clientRequest(loggingProxy);

    const cachingProxy = new CachingProxy(specificObject);
    clientRequest(cachingProxy);

    const virtualProxy = new VirtualProxy();
    clientRequest(virtualProxy);
});
