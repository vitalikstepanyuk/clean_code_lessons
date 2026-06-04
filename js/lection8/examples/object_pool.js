class Object {
    #innerState = 0;
    constructor(init = 0) {
        this.#innerState = init;
    }
    reset(init = 0) {
        this.#innerState = init;
    }
    doSomething() {
        console.log(`Object.doSomething ${++this.#innerState}`);
    }
};

class ObjectPool {
    static #instance;
    #pool = [];
    constructor() {
        if (ObjectPool.#instance) {
            return ObjectPool.#instance;
        }
        ObjectPool.#instance = this;
    }
    static get instance() {
        if (!ObjectPool.#instance) {
            ObjectPool.#instance = new ObjectPool();
        }
        return ObjectPool.#instance;
    }
    acquire() {
        if (this.#pool.length === 0) {
            return new Object();
        }
        return this.#pool.shift();
    }
    release(object) {
        object.reset();
        this.#pool.unshift(object);
    }
};

function withObject(fn) {
    let object = ObjectPool.instance.acquire();
    try {
        return fn(object);
    } finally {
        ObjectPool.instance.release(object);
    }
}

module.exports = { Object, ObjectPool, withObject };
