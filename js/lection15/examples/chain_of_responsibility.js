class ChainedHandler {
    constructor(successor = null) {
        this._successor = successor;
    }

    handle(request) {
        return this._successor? this._successor.handle(request) : "";
    }
};

class ChainedHandler1 extends ChainedHandler {
    constructor(successor = null) {
        super(successor);
    }

    handle(request) {
        if (request.substr(0, 6) !== "select") {
            return super.handle(request);
        }
        console.log("ChainedHandler1 handles SQL request " + request);
        return "1 row:\n1, John, Doe";
    }
};

class ChainedHandler2 extends ChainedHandler {
    constructor(successor = null) {
        super(successor);
    }

    handle(request) {
        if (request.substr(0, 4) !== "grep") {
            return super.handle(request);
        }
        console.log("ChainedHandler2 handles grep request " + request);
        return "John Doe";
    }
};

class ChainedHandler3 extends ChainedHandler {
    constructor(successor = null) {
        super(successor);
    }

    handle(request) {
        if (request.substr(0, 4) !== "find") {
            return super.handle(request);
        }
        console.log("ChainedHandler3 handles find request " + request);
        return "john_doe.txt";
    }
};

class Handler {
    handle(request) {
        return "";
    }
};

class Handler1 extends Handler {
    handle(request) {
        if (request.substr(0, 6) === "select") {
            console.log("Handler1 handles SQL request " + request);
            return "1 row:\n1, John, Doe";
        }
        return "";
    }
};

class Handler2 extends Handler {
    handle(request) {
        if (request.substr(0, 4) === "grep") {
            console.log("Handler2 handles grep request " + request);
            return "John Doe";
        }
        return "";
    }
};

class Handler3 extends Handler {
    handle(request) {
        if (request.substr(0, 4) === "find") {
            console.log("Handler3 handles find request " + request);
            return "john_doe.txt";
        }
        return "";
    }
};

class Chain {
    #handlers;
    constructor(...handlers) {
        this.#handlers = handlers;
    }

    handle(request) {
        for (let handler of this.#handlers) {
            let result = handler.handle(request);
            if (result) {
                return result;
            }
        }
        return "";
    }
};

module.exports = { ChainedHandler1, ChainedHandler2, ChainedHandler3, Handler1, Handler2, Handler3, Chain };
