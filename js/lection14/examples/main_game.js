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
            Hint.none = ["No hints available"];
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

class Cache {
    #key;
    #tasks;
    #hints;
    constructor(key) {
        this.#key = key;
        this.#tasks = new Map();
        this.#hints = new Map();
    }
    get key() { return this.#key; }
    get currentTask() { return this.task(this.#key); }
    get currentHint() { return this.hint(this.#key); }
    task(key) { let t = this.#tasks.get(key); return t != null? t : Task.none; }
    hint(key) { let h = this.#hints.get(key); return h != null? h : Hint.none; }
    update(key) {
        if (this.#key === key) {
            return false;
        }
        this.#key = key;

        let switchCache = (cache, key) => {
            let value = cache.get(key); 
            if (value == null) {
                cache.clear();
                return false;
            }
            cache = new Map([[key, value]]);
            return true;
        };
        if (!switchCache(this.#tasks, this.#key)) {
            this.loadTask(this.#key);
        }
        if (!switchCache(this.#hints, this.#key)) {
            this.loadHint(this.#key);
        }
        for (let i = 1; i <= this.currentTask.options.length; ++i) {
            let key = this.#key + i;
            this.loadTask(key);
            this.loadHint(key);
        }
        return true;
    }

    loadTask(key) { return null; }
    loadHint(key) { return null; }
    addTask(key, task) { this.#tasks.set(key, task); }
    addHint(key, hint) { this.#hints.set(key, hint); }
};

class FileCache extends Cache {
    static #TASK = "task";
    static #HINT = "hint";
    static #EXT = ".txt";
    #dir;
    constructor(dir, key) {
        super("");
        this.#dir = dir;
        this.update(key);
    }

    loadTask(key) {
        let task = Task.load(this.#dir + "/" + FileCache.#TASK + key + FileCache.#EXT);
        this.addTask(key, task);
        return task;
    }
    loadHint(key) {
        let hint = Hint.load(this.#dir + "/" + FileCache.#HINT + key + FileCache.#EXT);
        this.addHint(key, hint);
        return hint;
    }
};

class Saver {
    save(game) { return false; };
    load() { return null; }
};

class FileSaver extends Saver {
    #file;
    constructor(file) {
        super();
        this.#file = file;
    }
    get dir() { return path.dirname(this.#file); }
    get file() { return this.#file; }
    isFileExists() { return fs.existsSync(this.#file); }

    save(game) {
        let content = game.mission.history + "\n" + game.mission.score;
        try {
            fs.writeFileSync(this.#file, content);
            return true;
        } catch (err) {
            console.error(err);
        }
        return false;
    }
    load() {
        try {
            const data = fs.readFileSync(this.#file, 'utf8');
            let [key, strScore] = data.split(/\r?\n/);
            let cache = new FileCache(this.dir, key);
            let score = parseInt(strScore);
            return new Game(cache, score);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
        let cache = new FileCache(this.dir, "1");
        let score = cache.currentTask.score;
        return new Game(cache, score);
    }
};

class AutoSaver {
    #saver;
    #game;
    constructor(saver, game) {
        this.#saver = saver;
        this.#game = game;
    }
    after(fn) {
        try {
            fn();
        } finally {
            this.#saver.save(this.#game);
        }
    }
};

class AGame {
    get task() { return null; }
    get hint() { return null; }
    next(choise) { return false; }
    takeHint() { return null; }
    get history() { return ""; }
    get level() { return 0; }
    get score() { return 0; }
};

class Command {
    execute() {}
};

class ScheduledTask extends Command {
    static DEFAULT_DELAY = 1000;
    #trigger;
    #delay;
    #timer;
    #reject;
    constructor(trigger, delay = ScheduledTask.DEFAULT_DELAY) {
        super();
        this.#trigger = trigger;
        this.#delay = delay;
        this.#timer = null;
    }

    execute() {
        this.#trigger();
    }

    async run() {
        this.cancel();
        return new Promise((resolve, reject) => {
            this.#reject = reject;
            this.#timer = setTimeout((self) => {
                self.execute();
                resolve(true);
            }, this.#delay, this);
        });
    }

    cancel() {
        if (this.#timer) {
            this.#reject(false);
            clearTimeout(this.#timer);
            this.#timer = null;
        }
    }
};

class Bonus {
    #score;
    constructor(score) {
        this.#score = score;
    }
    get score() { return this.#score; }
};

class Mission extends AGame {
    #cache;
    #autoHint;
    #hint;
    #score;
    constructor(cache, score) {
        super();
        this.#cache = cache;
        this.#autoHint = new ScheduledTask(() => { this.#hint = this.#cache.currentHint; });
        this.#hint = Hint.none;
        this.#score = score;
        this.#autoHint.run();
    }
    get task() { return this.#cache.currentTask; }
    get hint() { return this.#hint; }

    next(choise) {
        if (choise == 0 || choise > this.task.options.length || 
            !this.#cache.update(this.#cache.key + choise)) {
            return false;
        }
        this.#autoHint.cancel();
        this.#autoHint.run();
        this.#hint = Hint.none;
        this.#score += this.task.score;
        return true;
    }

    takeHint() {
        let hint = this.#cache.currentHint;
        if (this.hint == hint) {
            return this.hint;
        }
        if (this.#score < hint.cost) {
            return this.#hint = Hint.none;
        }
        this.#score -= hint.cost;
        this.#autoHint.cancel();
        this.#hint = hint;
        return hint;
    }

    get history() { return this.#cache.key; }
    get level() { return this.history.length; }
    get score() { return this.#score; }
    accept(bonus) { this.#score += bonus.score; }
};

class CoinGame extends AGame {
    #history;
    #score;
    constructor() {
        super();
        this.#history = '';
        this.#score = 0;
    }

    get task() {
        return new Task(["Flip a coin for a luck"], ["1 - Flip", "0 - I'm done"], 10);
    }
    get hint() {
        return new Hint(["It's a luck to stop on time"]);
    }

    next(choise) {
        if (choise != 1) {
            return false;
        }
        let isHead = Math.floor(Math.random() * 2);
        if (isHead) {
            this.#history += "1";
            this.#score += this.task.score;
        } else {
            this.#history += "0";
        }
        return true;
    }

    takeHint() {
        return this.hint;
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

class Game extends AGame {
    #mainGame;
    #sideGame;
    #game;
    constructor(cache, score) {
        super();
        this.#mainGame = new Mission(cache, score);
        this.#sideGame = null;
        this.#game = this.#mainGame;
    }

    get task() { return this.#game.task; }
    get hint() { return this.#game.hint; }

    next(choise) {
        if (choise == 0) {
            this.switchGame();
            return true;
        }
        return this.#game.next(choise);
    }

    takeHint() { return this.#game.takeHint(); }

    get history() { return this.#game.history; }
    get level() { return this.#game.level; }
    get score() { return this.#game.score; }

    switchToMain() {
        if (this.#sideGame) {
            this.#mainGame.accept(new Bonus(this.#sideGame.score));
            this.#sideGame = null;
        }
        this.#game = this.#mainGame;
    }

    switchToSide() {
        this.#sideGame = new CoinGame();
        this.#game = this.#sideGame;
    }

    switchGame() { this.#game == this.#mainGame? this.switchToSide() : this.switchToMain(); }

    get mission() { return this.#mainGame; }
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

class SwitchGameCommand extends Command {
    #game;
    constructor(game) {
        super();
        this.#game = game;
    }

    execute() {
        this.#game.switchToSide();
    }
};

class SimpleCheatCommand extends Command {
    #game;
    #drops;
    constructor(game, drops = 10) {
        super();
        this.#game = game;
        this.#drops = drops;
    }

    execute() {
        this.#game.switchToSide();
        for (let i = 0; i < this.#drops; ++i) {
            this.#game.next(1);
        }
        this.#game.switchToMain();
    }
};

// Optional Flyweight for default Scene render implementation. It has no intrinsic state.
class Scene {
    render(task) {
        let scene = "";
        for (const descr of task.description) {
            scene += descr + "\n";
        }
        scene += "\n";
        for (const opt of task.options) {
            scene += opt + "\n";
        }
        for (const hint of task.hint) {
            scene += hint + "\n";
        }
        return scene;
    }
};

// Flyweight for Scene rendering. It has intrinsic state - background image and extrinsic state - task to render.
class SceneFlyweight extends Scene {
    #background;
    constructor(file) {
        super();
        this.#background = [];
        try {
            const data = fs.readFileSync(file, 'utf8');
            this.#background = data.split(/\r?\n/);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
    }

    render(game) {
        let scene = "";
        const MARGIN = 2;
        let task = game.task;
        let hint = game.hint;
        if (this.#background.length < task.description.length + task.options.length + hint.length + MARGIN + 2) {
            return scene;
        }
        let bgIt = this.#background[Symbol.iterator]();
        let magin = "";
        for (let i = 0; i < MARGIN; ++i) {
            scene += bgIt.next().value + "\n";
            magin += " ";
        }
        for (const descr of task.description) {
            scene += bgIt.next().value + magin + descr + "\n";
        }
        scene += bgIt.next().value + "\n";
        for (const opt of task.options) {
            scene += bgIt.next().value + magin + opt + "\n";
        }
        scene += bgIt.next().value + "\n";
        for (const hintLn of hint.hint) {
            scene += bgIt.next().value + magin + hintLn + "\n";
        }
        for (const line of bgIt) {
            scene += line + "\n";
        }
        return scene;
    }
};

// Flyweight "factory" that stores flyweights
class SceneFlyweightFactory {
    #flyweights;
    constructor(flyweights) {
        this.#flyweights = flyweights;
    }

    get(key) {
        let file = this.#flyweights[key];
        return file != null? new SceneFlyweight(file) : new Scene();
    }
};

// Facade that hides game complexity from the client
class GameFacade {
    #saver;
    #game;
    #sceneFactory;
    constructor() {
        this.#saver = new FileSaver("lection5/examples/save.txt");
        this.#game = this.#saver.load();
        this.#sceneFactory = new SceneFlyweightFactory({ 'DNGN': "lection11/examples/dungeon.txt" });
    }

    start() {
        return this.#sceneFactory.get('DNGN').render(this.#game);
    }

    next(choise) {
        let save = new AutoSaver(this.#saver, this.#game);
        this.#game.next(choise);
        return this.#sceneFactory.get('DNGN').render(this.#game);
    }
};
    
module.exports = { Task, Hint, Cache, FileCache, Saver, FileSaver, AutoSaver, Mission, CoinGame, Game, CommandChain, NextCommand, SwitchGameCommand, SimpleCheatCommand, Scene, SceneFlyweight, SceneFlyweightFactory, GameFacade };
