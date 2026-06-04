class SomeCheckSmeller {
    static #me = new SomeCheckSmeller();
    static getSmeller() {
        return SomeCheckSmeller.#canSomething()? SomeCheckSmeller.#me : null;
    }
    static #canSomething() {
        let maybe = Math.floor(Math.random() * 10) + 1;
        return maybe % 2 === 0;
    }

    doSomething() {
        console.log("Something is done");
        return true;
    }
};

module.exports = { SomeCheckSmeller };
