class SomeService {
    doSomething() {
        console.log("SomeService::doSomething");
    }
};
class OtherService {
    doSomethingElse() {
        console.log("OtherService::doSomethingElse");
    }
};

class ServiceLocator {
    #register = {};
    getService(id) {
        return this.#register[id];
    }
    registerService(id, service) {
        this.#register[id] = service;
    }
    unregisterService(id) {
        delete this.#register[id];
    }
    hasService(id) {
        return id in this.#register;
    }
};

module.exports = { SomeService, OtherService, ServiceLocator };
