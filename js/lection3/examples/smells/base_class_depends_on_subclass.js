class BaseSmeller {
    constructor(calculator) {
        this._calculator = calculator;
    }

    calcSomething() {
        console.log("calcSomething");
        return this._calculator.calc();
    }

    doSomething() {
        console.log("doSomething");
    }
    doSomethingElse() {
        console.log("doSomethingElse");
    }
};

class SubSmeller extends BaseSmeller {
    constructor() {
        super();
        super._calculator = this;
    }
    calc() {
        console.log("real calculation");
        return 10;
    }

    doSomething() {
        console.log("clarified doSomething");
    }
    doSomethingElse() { 
        console.log("clarified doSomethingElse");
    }
};

module.exports = { BaseSmeller, SubSmeller };
