class BaseNormal {
    calcSomething() {
        console.log("calcSomething common - real calculation");
        return 10;
    }

    doSomething() {
        console.log("doSomething common");
    }
    doSomethingElse() {
        console.log("doSomethingElse common");
    }
};

class SubNormal extends BaseNormal {
    doSomething() {
        console.log("clarified doSomething");
    }
    doSomethingElse() {
        console.log("clarified doSomethingElse");
    }
};

// Pull Up Method

// But what if we still need some delegation to the subclass? The only reason is that we ihnerited one hierarchy but need to partially use another one.

class SubNormal2 extends BaseNormal {
    calcSomething() {
        console.log("calcSomething by SubNormal2");
        return 20
    }
};

class SubNormal2Delegate extends BaseNormal {
    #calc;
    constructor(calc) {
        super();
        this.#calc = calc;
    }

    calcSomething() {
        return this.#calc.calcSomething();
    }

    doSomething() {
        console.log("clarified doSomething");
    }
    doSomethingElse() {
        console.log("clarified doSomethingElse");
    }
};

// Inteface Segregation Principle violation - clearly notable two different interfaces, so we need to split them
// Splitting interfaces

class BaseCalcInterface {
    calcSomething() {
        console.log("calcSomething");
        return 0;
    }
};

class BaseDoerInterface {
    doSomething() {
        console.log("doSomething");
    }
    doSomethingElse() {
        console.log("doSomethingElse");
    }
};

class SubCalc extends BaseCalcInterface {
    calcSomething() {
        console.log("real calcSomething");
        return 20;
    }
};

class SubDoer extends BaseDoerInterface {
    doSomething() {
        console.log("clarified doSomething");
    }
    doSomethingElse() {
        console.log("clarified doSomethingElse");
    }
};

class SubCalcDoerCombiner {
    #calc;
    #doer;
    constructor(calc, doer) {
        this.#calc = calc;
        this.#doer = doer;
    }
    get calc() {
        return this.#calc;
    }
    get doer() {
        return this.#doer;
    }
};

// Extract Class
// Extract Interface
// Replace Inheritance with Delegation

module.exports = { BaseNormal, SubNormal, SubNormal2, SubNormal2Delegate, SubCalc, SubDoer, SubCalcDoerCombiner };
