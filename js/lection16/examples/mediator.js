class Colleague {
    #mediator;
    constructor() {
        this.#mediator = null;
    }

    send(message) {
        this.#mediator.notify(message, this);
    }
    receive(message) {
        console.log(message);
    }

    setMediator(mediator) {
        this.#mediator = mediator;
    }
};

class Mediator {
    #colleagues = [];
    constructor(...colleagues) {
        this.#colleagues = colleagues;
        this.#colleagues.forEach(colleague => {
            colleague.setMediator(this);
        });
    }

    notify(message, from) {
        this.#colleagues.forEach(colleague => {
            if (colleague !== from) {
                colleague.receive(message);
            }
        });
    }
};

class ConcreteColleague extends Colleague {
    #name;
    #message;
    constructor(name) {
        super();
        this.#name = name;
        this.#message = '';
    }

    doSomething() {
        console.log(this.#name + " doing something");
        this.send(this.#name + " did something");
    }

    receive(message) {
        console.log(this.#name + " received: " + message);
        this.#message = message;
    }

    get receivedMessage() {
        return this.#message;
    }
};

module.exports = { Colleague, Mediator, ConcreteColleague };
