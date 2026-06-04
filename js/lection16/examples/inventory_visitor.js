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
    handle(inspector) { }
};

class Backpack {
    #items;
    constructor(items) {
        this.#items = items;
    }
    size() {
        return this.#items.length;
    }
    at(index) {
        return this.#items[index];
    }
};

class Machete extends Item {
    static DAMAGE = 50;
    #damage;
    constructor() {
        super("machete", "sharp machete");
        this.#damage = Machete.DAMAGE;
    }
    get damage() {
        return this.#damage;
    }
    use() {
        const step = 5;
        this.#damage = this.#damage >= step? this.#damage - step : 0;
    }
    sharpen() {
        this.#damage = Machete.DAMAGE;
    }
    handle(inspector) {
        inspector.inspectMachete(this);
    }
};

class Potion extends Item {
    static MANA = 100;
    #mana;
    constructor() {
        super("Potion vial", "Abracadabra potion 100ml");
        this.#mana = Potion.MANA;
    }
    get mana() {
        return this.#mana;
    }
    conjure() {
        const step = 5;
        this.#mana = this.#mana >= step? this.#mana - step : 0;
    }
    brew() {
        this.#mana = Potion.MANA;
    }
    handle(inspector) {
        inspector.inspectPotion(this);
    }
};

class Inspector {
    inspectMachete(machete) { }
    inspectPotion(potion) { }
};

class Restorer extends Inspector {
    inspectMachete(machete) {
        console.log("Inspecting " + machete.name + ", damage: " + machete.damage);
        if (machete.damage < Machete.DAMAGE) {
            console.log("Sharpening machete");
            machete.sharpen();
        }
    }
    inspectPotion(potion) {
        console.log("Inspecting " + potion.name + ", mana: " + potion.mana);
        if (potion.mana <= Potion.MANA) {
            console.log("Brew potion and pray to Dionysos");
            potion.brew();
        }
    }
};

module.exports = { Item, Backpack, Machete, Potion, Restorer };
