// Implementation
class Bot {
    #position = { x: 0, y: 0 };
    #direction = { x: 0, y: 1 };
    get position() { return this.#position; }
    get direction() { return this.#direction; }

    switchOn() {}
    switchOff() {}

    stepForward() {
        this.#position.x += this.#direction.x;
        this.#position.y += this.#direction.y;
    }
    stepBackward() {
        this.#position.x -= this.#direction.x;
        this.#position.y -= this.#direction.y;
    }
    stepLeft() {
        this.#position.x -= this.#direction.y;
        this.#position.y += this.#direction.x;
    }
    stepRight() {
        this.#position.x += this.#direction.y;
        this.#position.y -= this.#direction.x;
    }
    turnLeft() {
        let x = this.#direction.x;
        this.#direction.x = -this.#direction.y;
        this.#direction.y = x;
    }
    turnRight() {
        let x = this.#direction.x;
        this.#direction.x = this.#direction.y;
        this.#direction.y = -x;
    }
};

// Abstraction
class Dancer {
    constructor(impl) {
        this._impl = impl;
    }
    dance() {}
};

// RefinedAbstraction
class CountryDancer extends Dancer {
    constructor(impl) {
        super(impl);
    }
    dance() {
        this._impl.switchOn();
        this._impl.stepForward();
        this._impl.stepLeft();
        this._impl.stepRight();
        this._impl.stepBackward();
        this._impl.turnLeft();
        this._impl.turnRight();
        this._impl.switchOff();
    }
};

// RefinedAbstraction
class HipHopDancer extends Dancer {
    constructor(impl) {
        super(impl);
    }
    dance() {
        this._impl.switchOn();
        this._impl.stepBackward();
        this._impl.stepLeft();
        this._impl.turnLeft();
        this._impl.stepBackward();
        this._impl.stepBackward();
        this._impl.turnRight();
        this._impl.stepLeft();
        this._impl.stepForward();
        this._impl.switchOff();
    }
};

// ConcreteImplementor
class HumanoidBot extends Bot {
    switchOn() {
        super.switchOn();
        console.log("HumanoidBot is switched on");
    }
    switchOff() {
        super.switchOff();
        console.log("HumanoidBot is switched off");
    }
    stepForward() {
        super.stepForward();
        console.log(`HumanoidBot steps forward (${this.position.x} ${this.position.y})`);
    }
    stepBackward() {
        super.stepBackward();
        console.log(`HumanoidBot steps backward (${this.position.x} ${this.position.y})`);
    }
    stepLeft() {
        super.stepLeft();
        console.log(`HumanoidBot steps left (${this.position.x} ${this.position.y})`);
    }
    stepRight() {
        super.stepRight();
        console.log(`HumanoidBot steps right (${this.position.x} ${this.position.y})`);
    }
    turnLeft() {
        super.turnLeft();
        console.log(`HumanoidBot turns left (${this.direction.x} ${this.direction.y})`);
    }
    turnRight() {
        super.turnRight();
        console.log(`HumanoidBot turns right (${this.direction.x} ${this.direction.y})`);
    }
};

// ConcreteImplementor
class DogBot extends Bot {
    switchOn() {
        super.switchOn();
        console.log("DogBot is switched on");
    }
    switchOff() {
        super.switchOff();
        console.log("DogBot is switched off");
    }
    stepForward() {
        super.stepForward();
        console.log(`DogBot steps forward (${this.position.x} ${this.position.y})`);
    }
    stepBackward() {
        super.stepBackward();
        console.log(`DogBot steps backward (${this.position.x} ${this.position.y})`);
    }
    stepLeft() {
        super.stepLeft();
        console.log(`DogBot steps left (${this.position.x} ${this.position.y})`);
    }
    stepRight() {
        super.stepRight();
        console.log(`DogBot steps right (${this.position.x} ${this.position.y})`);
    }
    turnLeft() {
        super.turnLeft();
        console.log(`DogBot turns left (${this.direction.x} ${this.direction.y})`);
    }
    turnRight() {
        super.turnRight();
        console.log(`DogBot turns right (${this.direction.x} ${this.direction.y})`);
    }
};

module.exports = { Dancer, CountryDancer, HipHopDancer, Bot, HumanoidBot, DogBot };
