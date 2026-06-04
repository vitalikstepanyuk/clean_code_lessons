class DBSmeller {
    #isOpenedSmell;
    constructor() {
        this.#isOpenedSmell = false;
    }

    get isOpenedSmell() { return this.#isOpenedSmell; }    
    openSmell() {
        this.#isOpenedSmell = /*...*/ true;
        return this.#isOpenedSmell;
    }
    closeSmell() {
        /*...*/
        this.#isOpenedSmell = false;
    }

    query(q) {
        return new Promise((resolve) => {
            /*...*/
            resolve(10);
        });
    }
};

module.exports = { DBSmeller };
