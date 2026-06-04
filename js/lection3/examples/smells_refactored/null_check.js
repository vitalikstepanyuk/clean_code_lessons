class DefaultCheck {
    doSomething() {
        console.log("Done by default");
        return false;
    }
};

class SomeCheck {
    static #me = new SomeCheck();
    static #default = new DefaultCheck();
    static getCheck() {
        return SomeCheck.#canSomething()? SomeCheck.#me : SomeCheck.#default;
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

// Introduce Null Object

module.exports = { DefaultCheck, SomeCheck };
