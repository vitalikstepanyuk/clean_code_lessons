const { Task, Task1, Task2, Task3 } = require('./conditional_complexity.js');

test('Conditional complexity fix test', () => {
    let task = new Task;
    expect(task.doSomething()).toBeFalsy();
    let task1 = new Task1;
    expect(task1.doSomething()).toBeTruthy();
    let task2 = new Task2;
    expect(task2.doSomething()).toBeTruthy();
    let task3 = new Task3;
    expect(task3.doSomething()).toBeTruthy();
});
