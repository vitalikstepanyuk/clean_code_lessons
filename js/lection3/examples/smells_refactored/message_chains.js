class Item {
    #weight;
    constructor(weight) {
        this.#weight = weight
    }
    get weight() {
        return this.#weight;
    }
};

class Box {
    #item;
    constructor(item) {
        this.#item = item;
    }
    get item() {
        return this.#item;
    }
    get weight() {
        return this.#item.weight;
    }
};

class Pallet {
    static #OWN_WEIGHT = 20;
    #boxes;
    #weight;
    constructor(boxes) {
        this.#boxes = boxes;
        this.#weight = Pallet.#OWN_WEIGHT;
        for (let box of this.#boxes) {
            this.#weight += box.weight;
        }
    }
    get boxes() {
        return this.#boxes;
    }
    get weight() {
        return this.#weight;
    }
};

class Container {
    static #OWN_WEIGHT = 1000;
    #pallets;
    #weight;
    constructor(pallets) {
        this.#pallets = pallets;
        this.#weight = Container.#OWN_WEIGHT;
        for (let pallet of this.#pallets) {
            this.#weight += pallet.weight;
        }
    }
    get pallets() {
        return this.#pallets;
    }
    get weight() {
        return this.#weight;
    }
};

// Extract Method

module.exports = { Item, Box, Pallet, Container };
