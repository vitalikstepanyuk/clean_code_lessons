class StateNull {
    doSomething() { console.log("O-O-O"); }
};
class StateADF {
    doSomething() { console.log("A-D-F"); }
};
class StateADG {
    doSomething() { console.log("A-D-G"); }
};
class StateADH {
    doSomething() { console.log("A-D-H"); }
};
class StateAEF {
    doSomething() { console.log("A-E-F"); }
};
class StateAEG {
    doSomething() { console.log("A-E-G"); }
};
class StateAEH {
    doSomething() { console.log("A-E-H"); }
};
class StateBDF {
    doSomething() { console.log("B-D-F"); }
};
class StateBDG {
    doSomething() { console.log("B-D-G"); }
};
class StateBDH {
    doSomething() { console.log("B-D-H"); }
};
class StateBEF {
    doSomething() { console.log("B-E-F"); }
};
class StateBEG {
    doSomething() { console.log("B-E-G"); }
};
class StateBEH {
    doSomething() { console.log("B-E-H"); }
};
class StateCDF {
    doSomething() { console.log("C-D-F"); }
};
class StateCDG {
    doSomething() { console.log("C-D-G"); }
};
class StateCDH {
    doSomething() { console.log("C-D-H"); }
};
class StateCEF {
    doSomething() { console.log("C-E-F"); }
};
class StateCEG {
    doSomething() { console.log("C-E-G"); }
};
class StateCEH {
    doSomething() { console.log("C-E-H"); }
};

class NaiveStateMachine {
    #states;
    #transitions;
    #current;
    constructor() { 
        this.#states = [new StateNull(), new StateADF(), new StateADG(), new StateADH(), 
                                        new StateAEF(), new StateAEG(), new StateAEH(), 
                                        new StateBDF(), new StateBDG(), new StateBDH(), 
                                        new StateBEF(), new StateBEG(), new StateBEH(), 
                                        new StateCDF(), new StateCDG(), new StateCDH(), 
                                        new StateCEF(), new StateCEG(), new StateCEH()];
        this.#transitions = [[this.#states[0], this.#states[1]], 
                             [this.#states[1], this.#states[4]],
                             [this.#states[4], this.#states[10]],
                             [this.#states[10], this.#states[12]],
                             [this.#states[12], this.#states[18]],
                             [this.#states[18], this.#states[6]],
                             [this.#states[6], this.#states[3]],
                             [this.#states[3], this.#states[9]],
                             [this.#states[9], this.#states[15]],
                             [this.#states[15], this.#states[13]],
                             [this.#states[13], this.#states[14]],
                             [this.#states[14], this.#states[2]],
                             [this.#states[2], this.#states[8]],
                             [this.#states[8], this.#states[11]],
                             [this.#states[11], this.#states[5]],
                             [this.#states[5], this.#states[17]],
                             [this.#states[17], this.#states[16]],
                             [this.#states[16], this.#states[7]],
                             [this.#states[7], this.#states[0]]];
        this.#current = 0;
    }
    get state() {
        return this.#transitions[this.#current][0];
    }
    next() {
        ++this.#current;
        if (this.#current === this.#transitions.length) {
            this.#current = 0;
        }
    }
};

const { sm } = require('jssm');

class StateMachine {
    #fsm;
    #states;
    constructor() {
        this.#fsm = sm`StateNull -> StateADF 'next' -> StateAEF 'next' -> 
                        StateBEF 'next' -> StateBEH 'next' -> StateCEH 'next' -> 
                        StateAEH -> StateADH 'next' -> StateBDH 'next' -> 
                        StateCDH 'next' -> StateCDF 'next' -> StateCDG 'next' -> 
                        StateADG 'next' -> StateBDG 'next' -> StateBEG 'next' -> 
                        StateAEG 'next' -> StateCEG 'next' -> StateCEF 'next' -> 
                        StateBDF 'next' -> StateNull;
                        StateAEH -> StateAEG;`;
        this.#states = new Map([["StateNull", new StateNull()], 
                                ["StateADF", new StateADF()], ["StateADG", new StateADG()], ["StateADH", new StateADH()],
                                ["StateAEF", new StateAEF()], ["StateAEG", new StateAEG()], ["StateAEH", new StateAEH()],
                                ["StateBDF", new StateBDF()], ["StateBDG", new StateBDG()], ["StateBDH", new StateBDH()],
                                ["StateBEF", new StateBEF()], ["StateBEG", new StateBEG()], ["StateBEH", new StateBEH()],
                                ["StateCDF", new StateCDF()], ["StateCDG", new StateCDG()], ["StateCDH", new StateCDH()],
                                ["StateCEF", new StateCEF()], ["StateCEG", new StateCEG()], ["StateCEH", new StateCEH()]]);
    }
    get index() { return this.#fsm.state(); }
    get current() { return this.#states.get(this.index); }
    run() { while (this.next()); }
    next() { return this.#fsm.action('next'); }
    switchTo(state) { return this.#fsm.transition(state); }
};

module.exports = { NaiveStateMachine, StateMachine };
