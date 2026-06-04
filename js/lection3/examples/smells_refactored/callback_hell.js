class AsyncLauncher {
    doSomething() {
        return new Promise((resolve) => {
            console.log("doSomething successfully");
            resolve(true);
        });
    }
    doSomethingElse() {
        return new Promise((resolve) => {
            console.log("doSomethingElse successfully");
            resolve(true);
        });
    }
    doSomethingElseElse() {
        return new Promise((resolve) => {
            console.log("doSomethingElseElse successfully");
            resolve(true);
        });
    }
};

// Replace Callback with Promise
// Remove Parameter

module.exports = { AsyncLauncher };
