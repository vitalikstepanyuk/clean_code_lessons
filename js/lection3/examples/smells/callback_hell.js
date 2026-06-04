class CallbackSmeller {
    doSomething(cb) {
        console.log("doSomething");
        return this.#doSomethingInner(cb);
    }
    doSomethingElse(cb) {
        console.log("doSomethingElse");
        return this.#doSomethingInner(cb);
    }
    doSomethingElseElse(cb) {
        console.log("doSomethingElseElse");
        return this.#doSomethingInner(cb);
    }
    #doSomethingInner(cb) {
        let result = true;
        /*...*/
        if (result) {
            result = cb();
        }
        return result;
    }
};

module.exports = { CallbackSmeller };
