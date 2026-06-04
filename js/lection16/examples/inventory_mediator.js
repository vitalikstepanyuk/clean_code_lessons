class Item {
    #name;
    #description;
    #backpack;
    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        this.state = 100;
        this.#backpack = null;
    }
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }
    use() {
        const step = 5;
        this.state = this.state >= step? this.state - step : 0;
    }
    inplace(backpack) {
        this.#backpack = backpack;
    }
    send(command) {
        this.#backpack.notify(command, this);
    }
    receive(command) { }
};

class Backpack {
    #items;
    constructor(items) {
        this.#items = items;
        this.#items.forEach(item => {
            item.inplace(this);
        });
    }
    size() {
        return this.#items.length;
    }
    at(index) {
        return this.#items[index];
    }
    replace(index, item) {
        this.#items[index] = item;
        item.inplace(this);
    }
    notify(command, from) {
        this.#items.forEach(item => {
            if (item !== from) {
                item.receive(command);
            }
        });
    }
};

class Machete extends Item {
    static DAMAGE = 50;
    constructor() {
        super("machete", "sharp machete");
    }
    get damage() {
        return Machete.DAMAGE * (this.state / 100);
    }
    sharpen() {
        this.state = 100;
        console.log("Machete sharpened, glory to Hephaestus!");
    }
    receive(command) {
        if (command === 'SHRP') {
            this.sharpen();
        }
    }
};

class Potion extends Item {
    static MANA = 100;
    constructor() {
        super("Potion vial", "Abracadabra potion 100ml");
    }
    get mana() {
        return Potion.MANA * (this.state / 100);
    }
    brew() {
        this.state = 100;
        console.log("Potion brewed, glory to Dionysos!");
    }
    receive(command) {
        if (command === 'BREW') {
            this.brew();
        }
    }
};

class Sharpener extends Item {
    constructor() {
        super("sharpener", "fine sharpener");
    }
    use() {
        if (this.state) {
            super.use();
            this.send('SHRP');
        }
    }
    inplace(backpack) {
        super.inplace(backpack);
        this.use();
    }
};

class Distilator extends Item {
    constructor() {
        super("distilator", "magic distilator");
    }
    use() {
        if (this.state) {
            super.use();
            this.send('BREW');
        }
    }
    inplace(backpack) {
        super.inplace(backpack);
        this.use();
    }
};

module.exports = { Item, Backpack, Machete, Potion, Sharpener, Distilator };
