// Target interface/policy required to be implemented
class Target {
    request() {}
    otherRequest() {}
};

// Class we have that can do the work - Adaptee we want to adapt to Target
class Adaptee {
    specificRequest() {
        console.log("Adaptee specificRequest");
        return true;
    }
    canPerformSpecificRequest() {
        console.log("Adaptee canPerformSpecificRequest");
        return true;
    }
    otherSpecificRequest() {
        console.log("Adaptee otherSpecificRequest");
        return [1, 2, 3];
    }
};

// Adapter that fits Target interface and uses an Adaptee object to perform the work
class Adapter extends Target {
    #adaptee;
    constructor(adaptee) {
        super();
        this.#adaptee = adaptee;
    }
    request() {
        console.log("Adapter request");
        return this.#adaptee.specificRequest()? "{code: success}" : "{code: failed}";
    }
    otherRequest() {
        console.log("Adapter otherRequest");
        if (!this.#adaptee.canPerformSpecificRequest()) {
            return "{code: failed}";
        }
        let result = "{code: success, data: [";
        let responce = this.#adaptee.otherSpecificRequest();
        for (let byte of responce) {
            result += byte + ", ";
        }
        result += "]}";
        return result;
    }
};

// Class Adapter with mixin is overcomplication in JS
// It just adds Adaptee methods but how to use them in purpose of implementing Target is responsibility of ClassAdapter
// The main withdraw in this case is that Adaptee shouldn't have any state, just methods or it causes errors. Otherwise, you should prefer Object Adapter
const AdapteeMixin = (C) => class extends C {
    constructor() {
        super();
        this.specificRequest = Adaptee.prototype.specificRequest;
        this.canPerformSpecificRequest = Adaptee.prototype.canPerformSpecificRequest;
        this.otherSpecificRequest = Adaptee.prototype.otherSpecificRequest;
    }
};

class ClassAdapter extends AdapteeMixin(Target) {
    request() {
        console.log("ClassAdapter request");
        return this.specificRequest()? "{code: success}" : "{code: failed}";
    }
    otherRequest() {
        console.log("ClassAdapter otherRequest");
        if (!this.canPerformSpecificRequest()) {
            return "{code: failed}";
        }
        let result = "{code: success, data: [";
        let responce = this.otherSpecificRequest();
        for (let byte of responce) {
            result += byte + ", ";
        }
        result += "]}";
        return result;
    }
};

// Client code that expects Target and don't care what specific Adaptee does the work
function clientRequest(target) {
    target.request();
    target.otherRequest();
}

// Example how to add common functionality to some specific classes without extending them, by aggregating with Adapter
class ConcreteTarget extends Target {
    request() {
        console.log("ConcreteTarget request");
        return "{code: success, data [1, 2, 3]}";
    }
    otherRequest() {
        console.log("ConcreteTarget otherRequest");
        return "{code: success, data: {key1: 1, key2: 2, key3: 3}}";
    }
};

class ExtendedAdapter extends Target {
    #target;
    constructor(target) {
        super();
        this.#target = target;
    }
    request() {
        console.log("ExtendedAdapter request");
        return this.#target.request();
    }
    otherRequest() {
        console.log("ExtendedAdapter otherRequest");
        return this.#target.otherRequest();
    }
    extendedRequest() {
        console.log("ExtendedAdapter extendedRequest");
        return "{code: success, data: {key1: [1, 2], key2: [3, 4, 5]}}";
    }
};

function extendedClientRequest(extended) {
    extended.request();
    extended.otherRequest();
    extended.extendedRequest();
}

// Example of Adapter pattern applied to autonomous car driving
// Usual cars are Adaptee
class Car {
    #speed;
    #direction;
    constructor() {
        this.#speed = 0;
        this.#direction = 0;
    }
    accelerate(speed) {
        console.log(`Car acceleratea to ${speed}`);
        this.#speed = speed;
        return this.#speed;
    }
    brake(speed) {
        console.log(`Car brakes to ${speed}`);
        this.#speed = speed;
        return this.#speed;
    }
    turn(angle) {
        console.log(`Car turn on ${angle}`);
        this.#direction += angle;
        return this.#direction;
    }
    get speed() {
        return this.#speed;
    }
    get direction() {
        return this.#direction;
    }
};

// Autonomous Robotic Cars are Target
class RoboticCar {
    drive(coordinates) {}
};

// Robotic bots are Adapters that can autonomously drive any usual car
class RoboticAdapter extends RoboticCar {
    #car;
    #currentPosition;
    #route;
    constructor(car) {
        super();
        this.#car = car;
        this.#currentPosition = {x: 0, y: 0};
        this.#route = [];
    }
    drive(coordinates) {
        console.log(`RoboticAdapter drives to ${coordinates.x}, ${coordinates.y}`);
        const route = this.#buildRoute(coordinates);
        for (let point of route) {
            this.#currentPosition = this.#driveToPoint(point);
        }
        this.#brake(0);
        return this.#currentPosition;
    }
    #dbgMove = 1;
    #checkPosition() {
        if (this.#dbgMove < 9 && this.#route.length) {
            this.#currentPosition = this.#route[this.#dbgMove++];
        }
        return this.#currentPosition;
    }
    #calcDirection(coordinates) {
        return Math.atan2(coordinates.y - this.#currentPosition.y, coordinates.x - this.#currentPosition.x) * this.#DEG;
    }
    #calcDistance(coordinates) {
        return Math.sqrt(Math.pow(coordinates.x - this.#currentPosition.x, 2) + Math.pow(coordinates.y - this.#currentPosition.y, 2));
    }
    #buildRoute(finish) {
        this.#currentPosition = {x: 46476448, y: 30708789};
        return this.#route = [
            this.#currentPosition,
            {x: 46475037, y: 30709518},
            {x: 46473721, y: 30724416},
            {x: 46471382, y: 30726999},
            {x: 46471460, y: 30727445},
            {x: 46472058, y: 30727822},
            {x: 46471369, y: 30736940},
            {x: 46487097, y: 30739257},
            {x: 46487946, y: 30740796}];
    }
    #accelerate(speed) {
        while (this.#car.speed < speed) {
            this.#car.accelerate(Math.min(this.#car.speed + this.#SMOOTHSPEED, speed));
        }
        this.#car.accelerate(speed);
        return this.#car.speed;
    }
    #brake(speed) {
        while (this.#car.speed > speed) {
            this.#car.brake(Math.max(this.#car.speed - this.#SMOOTHSPEED, speed));
        }
        this.#car.brake(speed);
        return this.#car.speed;
    }
    #DEG = 180 / Math.PI;
    #ALLOWEDSPEED = 50;
    #SAFESPEED = 30;
    #SMOOTHSPEED = 10;
    #SAFEDISTANCE = 10;
    #DIVERGENTANGEL = 2;
    #driveToPoint(coordinates) {
        if (this.#currentPosition.x === coordinates.x && this.#currentPosition.y === coordinates.y) {
            return this.#currentPosition;
        }
        const direction = this.#calcDirection(coordinates);
        if (Math.abs(direction - this.#car.direction) > this.#DIVERGENTANGEL) {
            this.#brake(this.#SAFESPEED);
            this.#car.turn(direction);
        }
        this.#accelerate(this.#ALLOWEDSPEED);
        //while (this.#calcDistance(coordinates) > this.#SAFEDISTANCE) {
            // check obstacles, etc.
            this.#checkPosition();
        //}
        this.#brake(this.#SAFESPEED);
        return this.#currentPosition;
    }
};

function clientDriveBy(car, coordinates) {
    return car.drive(coordinates);
}

module.exports = { Adaptee, Adapter, ClassAdapter, clientRequest, ConcreteTarget, ExtendedAdapter, extendedClientRequest, Car, RoboticAdapter, clientDriveBy };
