class State {
    #stateCode;
    constructor(stateCode) {
        this.#stateCode = stateCode;
    }
    get stateCode() { return this.#stateCode; }

    handleOp1() {}
    handleOp2() {}
};

class ConcreteState1 extends State {
    constructor() {
        super('CST1');
    }

    handleOp1() {
        console.log("ConcreteState1 handleOp1");
    }
    handleOp2() {
        console.log("ConcreteState1 handleOp2");
    }
};

class ConcreteState2 extends State {
    #context;
    constructor(context) {
        super('CST2');
        this.#context = context;
    }

    handleOp1() {
        console.log("ConcreteState2 handleOp1");
    }
    handleOp2() {
        console.log("ConcreteState2 handleOp2");
        this.#context.setState(new ConcreteState1());
    }
};

class Context {
    #state;
    constructor(state) {
        this.#state = state;
    }

    setState(state) {
        this.#state = state;
    }
    get stateCode() { return this.#state.stateCode; }

    request1() {
        this.#state.handleOp1();
        this.setState(new ConcreteState2(this));
    }
    request2() {
        this.#state.handleOp2();
    }
};

module.exports = { ConcreteState1, ConcreteState2, Context };
