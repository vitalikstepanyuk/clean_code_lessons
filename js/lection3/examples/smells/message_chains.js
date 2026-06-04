class Item {
    #weight;
    constructor(weight) {
        this.#weight = weight
    }
    get weight() {
        return this.#weight;
    }
};

class BoxSmeller {
    #item;
    constructor(item) {
        this.#item = item;
    }
    get item() {
        return this.#item;
    }
};

class PalletSmeller {
    #boxes;
    constructor(boxes) {
        this.#boxes = boxes;
    }
    get boxes() {
        return this.#boxes;
    }
};

class ContainerSmeller {
    #pallets;
    constructor(pallets) {
        this.#pallets = pallets;
    }
    get pallets() {
        return this.#pallets;
    }
};

function calcWeight(container) {
    let weight = 0;
    for (let pallet of container.pallets) {
        for (let box of pallet.boxes) {
            weight += box.item.weight;
        }
    }
    return weight;
}

module.exports = { Item, BoxSmeller, PalletSmeller, ContainerSmeller, calcWeight };
