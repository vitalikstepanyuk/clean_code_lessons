// Optional declaration of common interface
class Object {
    request() {}
};

// Specific object that does the basic work
class SpecificObject extends Object {
    request() {
        console.log("SpecificObject request");
        return "{code: success}";
    }
};

// Proxy that wraps the SpecificObject with additional functionality
class Proxy extends Object {
    #object;
    constructor(object) {
        super();
        this.#object = object;
    }

    request() {
        console.log("Proxy request");
        if (!this.#doSomething()) {
            return "{code: failed}";
        }
        let result = this.#object.request();
        this.#doSomethingElse(result);
        return result;
    }

    #doSomething() {
        console.log("Proxy doSomething");
        return true;
    }
    #doSomethingElse(result) {
        console.log(`Proxy doSomethingElse with ${result}`);
    }
};

// Protection Proxy that checks specific conditions to access the SpecificObject
class ProtectionProxy extends Object {
    #object;
    constructor(object) {
        super();
        this.#object = object;
    }

    request() {
        console.log("ProtectionProxy request");
        if (!this.#checkAccess()) {
            return "{code: denied}";
        }
        return this.#object.request();
    }

    #checkAccess() {
        console.log("ProtectionProxy checkAccess");
        return true;
    }
};

// Logging Proxy that logs the request/result of the SpecificObject
class LoggingProxy extends Object {
    #object;
    constructor(object) {
        super();
        this.#object = object;
    }

    request() {
        console.log("LoggingProxy request");
        let result = this.#object.request();
        this.#log(result);
        return result;
    }

    #log(result) {
        console.log(`LoggingProxy log ${result}`);
    }
};

// Caching Proxy that caches the result of the SpecificObject for instant usage while the cache is valid
class CachingProxy extends Object {
    #object;
    #cache;
    constructor(object) {
        super();
        this.#object = object;
    }

    request() {
        console.log("CachingProxy request");
        if (this.#isCacheValid()) {
            return this.#cache;
        }
        return this.#cache = this.#object.request();
    }

    #isCacheValid() {
        console.log("CachingProxy check isCacheValid");
        return false;
    }
};

// Virtual Proxy that creates the SpecificObject on demand only when it is needed
class VirtualProxy extends Object {
    #object;
    constructor() {
        super();
        this.#object = null;
    }

    request() {
        console.log("VirtualProxy request");
        if (!this.#object) {
            console.log("VirtualProxy create SpecificObject");
            this.#object = new SpecificObject();
        }
        return this.#object.request();
    }
};

// Client code that works with objects in a uniform way
function clientRequest(object) {
    object.request();
}

module.exports = { Object, SpecificObject, Proxy, ProtectionProxy, LoggingProxy, CachingProxy, VirtualProxy, clientRequest };
