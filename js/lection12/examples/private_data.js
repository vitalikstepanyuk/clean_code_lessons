class PrivateClassData {
    #someData;
    #otherData;
    constructor(someData, otherData) {
        this.#someData = someData;
        this.#otherData = otherData;
    }

    get someData() {
        return this.#someData;
    }

    get otherData() {
        return this.#otherData;
    }
};

class MainClass {
    #data;
    constructor(someData, otherData) {
        this.#data = new PrivateClassData(someData, otherData);
    }

    get data() {
        return this.#data;
    }

    operation() {
        return this.#data.someData * this.#data.otherData.length;
    }
};

module.exports = { MainClass };
