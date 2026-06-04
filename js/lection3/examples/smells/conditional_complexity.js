const Tasks = Object.freeze({
    NONE: Symbol(0),
    TASK1: Symbol(1),
    TASK2: Symbol(2),
    TASK3: Symbol(3),
    TASK4: Symbol(4),
    TASK5: Symbol(5)
});

class AllPurposeSmeller {
    #task;
    constructor() {
        this.#task = Tasks.NONE;
    }
    doSomething(task) {
        switch (task) {
            case Tasks.TASK1:
                console.log("Task1");
                break;
            case Tasks.TASK2:
                console.log("Task2");
                break;
            case Tasks.TASK3:
                console.log("Task3");
                break;
            case Tasks.TASK4:
                console.log("Task4");
                break;
            case Tasks.TASK5:
                console.log("Task5");
                break;
            default:
                this.#task = Tasks.NONE;
                return false;
        }
        this.#task = task;
        return true;
    }
    get task() {
        return this.#task;
    }
};

module.exports = { Tasks, AllPurposeSmeller };
