class Task {
    doSomething() {
        console.log("NoTask");
        return false;
    }
};
class Task1 extends Task {
    doSomething() {
        console.log("Task1");
        return true;
    }
};
class Task2 extends Task {
    doSomething() {
        console.log("Task2");
        return true;
    }
};
class Task3 extends Task {
    doSomething() {
        console.log("Task3");
        return true;
    }
};
class Task4 extends Task {
    doSomething() {
        console.log("Task4");
        return true;
    }
};
class Task5 extends Task {
    doSomething() {
        console.log("Task5");
        return true;
    }
};

// Replace Type Code with Classes
// Replace Conditional with Polymorphism

module.exports = { Task, Task1, Task2, Task3, Task4, Task5 };
