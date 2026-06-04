const fs = require("fs");

class Settings {
    static #instance;
    static #SETTINGS = "lection8/homework/settings.json"
    #settings;
    constructor() {
        if (Settings.#instance) {
            return Settings.#instance;
        }
        this.#settings = JSON.parse(fs.readFileSync(Settings.#SETTINGS));
        Settings.#instance = this;
    }
    static get instance() {
        if (!Settings.#instance) {
            Settings.#instance = new Settings();
        }
        return Settings.#instance;
    }
    get(key) {
        return this.#settings[key];
    }
};

class BasicSettings {
    static option1() { return Settings.instance.get("option1"); }
};

class AdvancedSettings {
    static option2() { return Settings.instance.get("option2"); }
    static option3() { return Settings.instance.get("option3"); }
    static option4() { return Settings.instance.get("option4"); }
    static option5() { return Settings.instance.get("option5"); }
};

class Tracker {
    static #instance;
    #count = {};
    constructor() {
        if (Tracker.#instance) {
            return Tracker.#instance;
        }
        Tracker.#instance = this;
    }
    static get instance() {
        if (!Tracker.#instance) {
            Tracker.#instance = new Tracker();
        }
        return Tracker.#instance;
    }
    track(key) {
        if (!this.#count[key]) {
            this.#count[key] = 0;
        }
        this.#count[key]++;
    }
    count() {
        return this.#count;
    }
    toString() {
        let result = "Statistics:\n";
        for (let key in this.#count) {
            result += `${key}: ${this.#count[key]}\n`;
        }
        return result;
    }
};

class Item {
    #name;
    #description;
    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }
    get name() { return this.#name; }
    get description() { return this.#description; }
};

class Backpack {
    #items;
    constructor(items) {
        this.#items = items;
    }
    get(index) { return this.#items[index]; }
    set(index, item) { this.#items[index] = item; }
};

class Reward extends Item {
    #score;
    constructor(name, description, score) {
        super(name, description);
        this.#score = score;
    }
    get score() { return this.#score; }
    static none() {
        return new Reward("no reward", "", 0);
    }

    static #REWARDS = [ new Reward("bad reward", "You've got into a trap", -1),
                        new Reward("bronze reward", "...", 5),
                        new Reward("silver reward", ".....", 10),
                        new Reward("gold reward", ".......", 15),
                        new Reward(AdvancedSettings.option2(), AdvancedSettings.option3(), AdvancedSettings.option4()) ];
    static generate() {
        const size = Reward.#REWARDS.length;
        const ix = Math.floor(Math.random() * (size + 1));
        const got = ix < size? Reward.#REWARDS[ix] : Reward.none();
        Tracker.instance.track(got.name);
        return got;
    }
};

function onNext(choise) {
    Tracker.instance.track(choise);

    if (!BasicSettings.option1()) {
        return Reward.none();
    }
    const reward = Reward.generate();
    console.log(`${reward.name}: ${reward.description}`);
    return reward;
}

function onExit() {
    console.log(Tracker.instance.toString());
}

function gameEmulation() {
    let backpack = new Backpack([ new Item("flashlight", "flashlight with a weak battery"),
                                  new Item("aid kit", "first aid kit"),
                                  new Item("rope", "rope 20m"),
                                  new Item("knife", "pocket knife"),
                                  new Item("lighter", "gas lighter") ]);

    for (let p = 5, i = 0; i < 10; ++i) {
        let reward = onNext(Math.floor((i + Math.random()) % 5));
        if (reward.score >= AdvancedSettings.option4()) {
            backpack.set(--p, reward);
            if (p === 0) {
                break;
            }
        }
    }
    onExit();
}

module.exports = { Settings, BasicSettings, AdvancedSettings, Tracker, Item, Backpack, Reward, onNext, onExit, gameEmulation };
