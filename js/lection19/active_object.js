class ActiveObject {
    #queue;
    constructor() {
        this.#queue = [];
    }

    #runNextTask() {
        if (this.#queue.length > 0) {
            const task = this.#queue.shift();
            task();
            this.#runNextTask();
        }
    }

    #enqueue(task) {
        this.#queue.push(task);
        this.#runNextTask();
    }

    doSomething(num) {
        return new Promise((resolve) => {
            this.#enqueue(() => {
                setTimeout(() => {
                    console.log(`doSomething ${num}`);
                    resolve(num);
                }, 10);
            });
        });
    }
};

module.exports = { ActiveObject };
