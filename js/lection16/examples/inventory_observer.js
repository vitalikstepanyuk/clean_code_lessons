class Observer {
    update(data) { }
};

class Subject {
    #observers;
    constructor() {
        this.#observers = [];
    }
    attach(observer) {
        if (!this.#observers.includes(observer)) {
            this.#observers.push(observer);
        }
    }
    detach(observer) {
        this.#observers = this.#observers.filter(item => item !== observer);
    }
    notify(data) {
        this.#observers.forEach(observer => observer.update(data));
    }
};

class Tracker extends Observer {
    #count;
    constructor() {
        super();
        this.#count = {};
    }

    track(key) {
        if (!this.#count[key]) {
            this.#count[key] = 0;
        }
        this.#count[key]++;
    }
    count(key) {
        return this.#count[key];
    }

    update(name) {
        this.track(name);
        console.log("Tracker::update " + name + ": " + this.count(name));
    }
};

class Item {
    #name;
    #description;
    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }
};

class Backpack extends Subject {
    #items;
    constructor(items) {
        super();
        this.#items = items;
    }

    size() {
        return this.#items.length;
    }
    at(index) {
        const item = this.#items[index];
        this.notify(item.name);
        return item;
    }
};

class Encourager extends Observer {
    update(name) {
        console.log("Wow! Nice " + name);
    }
};

module.exports = { Item, Backpack, Tracker, Encourager };
