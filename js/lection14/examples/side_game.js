const fs = require('node:fs');
const path = require('node:path');

class Task {
    #description;
    #options;
    #score;
    constructor(descrpition, options = [], score = 0) {
        this.#description = descrpition;
        this.#options = options;
        this.#score = score;
        if (Task.none === undefined) {
            Task.none = ["Game over!"];
            Task.none = new Task(Task.none);
        }
    }
    get description() { return this.#description; }
    get options() { return this.#options; }
    get score() { return this.#score; }

    static load(file) {
        try {
            const data = fs.readFileSync(file, 'utf8');
            let [desc, opt, s] = data.split(/---\r?\n/);
            let description = desc.trim().split(/\r?\n/);
            opt = opt.trim();
            let options = opt != ''? opt.split(/\r?\n/) : [];
            let score = parseInt(s);
            return new Task(description, options, score);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
        return Task.none;
    }
};

class Hint {
    #hint;
    #cost;
    constructor(hint, cost = 0) {
        this.#hint = hint;
        this.#cost = cost;
        if (Hint.none === undefined) {
            Hint.none = [""];
            Hint.none = new Hint(Hint.none);
        }
    }
    get hint() { return this.#hint; }
    get cost() { return this.#cost; }

    static load(file) {
        try {
            const data = fs.readFileSync(file, 'utf8');
            let [desc, c] = data.split(/---\r?\n/);
            let hint = desc.trim().split(/\r?\n/);
            let cost = parseInt(c);
            return new Hint(hint, cost);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
        return Hint.none;
    }
};

class AGame {
    task() { return null; }
    hint() { return null; }
    next(choise) { return false; }
    takeHint() { return null; }
    get history() { return ""; }
    get level() { return 0; }
    get score() { return 0; }
};

class CoinGame extends AGame {
    #history;
    #score;
    constructor() {
        super();
        this.#history = '';
        this.#score = 0;
    }

    task() {
        return new Task(["Flip a coin for a luck"], ["1 - Flip", "0 - I'm done"], 10);
    }
    hint() {
        return new Hint(["It's a luck to stop on time"]);
    }

    next(choise) {
        if (choise != 1) {
            return false;
        }
        let isHead = Math.floor(Math.random() * 2);
        if (isHead) {
            this.#history += "1";
            this.#score += this.task().score;
        } else {
            this.#history += "0";
        }
        return true;
    }

    takeHint() {
        return this.hint();
    }

    get history() {
        return this.#history;
    }
    get level() {
        return this.#history.length;
    }
    get score() {
        return this.#score;
    }
};

class Command {
    execute() {}
};

class CommandChain extends Command {
    #commands;
    constructor(...commands) {
        super();
        this.#commands = commands;
    }

    execute() {
        this.#commands.forEach(command => command.execute());
    }
};

class NextCommand extends Command {
    #game;
    #choise;
    constructor(game, choise) {
        super();
        this.#game = game;
        this.#choise = choise;
    }

    execute() {
        this.#game.next(this.#choise);
    }
};

module.exports = { Task, Hint, CoinGame, Command, CommandChain, NextCommand };
