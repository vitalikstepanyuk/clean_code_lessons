class Receiver {
    #state = 0;
    get state() { return this.#state; }

    action() {
        console.log("Receiver action", ++this.#state);
    }
};

class Command {
    execute() {}
};

class ConcreteCommand extends Command {
    #receiver;
    constructor(receiver) {
        super();
        this.#receiver = receiver;
    }

    execute() {
        console.log("ConcreteCommand execute");
        this.#receiver.action();
    }
};

class CommandChain extends Command {
    #commands;
    constructor(...commands) {
        super();
        this.#commands = commands;
    }

    execute() {
        console.log("CommandChain execute");
        this.#commands.forEach(command => command.execute());
    }
};

class Invoker {
    #command;
    setCommand(command) {
        this.#command = command;
    }

    executeCommand() {
        this.#command.execute();
    }
};
  
class ScheduledTask extends ConcreteCommand {
    static DEFAULT_DELAY = 1000;
    #delay;
    #timer;
    #reject;
    constructor(receiver, delay = ScheduledTask.DEFAULT_DELAY) {
        super(receiver);
        this.#delay = delay;
        this.#timer = null;
    }

    async run() {
        this.cancel();
        return new Promise((resolve, reject) => {
            this.#reject = reject;
            this.#timer = setTimeout((self) => {
                self.execute();
                resolve(true);
            }, this.#delay, this);
        });
    }

    cancel() {
        if (this.#timer) {
            this.#reject(false);
            clearTimeout(this.#timer);
            this.#timer = null;
        }
    }
};

module.exports = { Receiver, Command, ConcreteCommand, CommandChain, Invoker, ScheduledTask };
