const fs = require('node:fs');

class Task {
    #file = "";
    #description = "";
    #options = [];
    constructor(file) {
        this.#file = file;
        try {
            const data = fs.readFileSync(this.#file, 'utf8');
            let [desc, opt, _] = data.split(/---\r?\n/);
            this.#description = desc.trimEnd();
            this.#options = opt.trim().split(/\r?\n/);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
    }

    get file() { return this.#file; }
    get description() { return this.#description; }
    get options() { return this.#options; }

    next(choise) {
        if (choise == 0 || choise > this.#options.length) {
            throw new Error("Invalid choise");
        }
        const p = this.#file.lastIndexOf('.');
        const next = this.#file.substring(0, p) + choise + this.#file.substring(p);
        return new Task(next);
    }

    save(file) {
        try {
            fs.writeFileSync(file, this.#file, 'utf8');
            return true;
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    static load(file) {
        try {
            const data = fs.readFileSync(file, 'utf8');
            return new Task(data);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(err);
            }
        }
    }
};

module.exports = { Task };
