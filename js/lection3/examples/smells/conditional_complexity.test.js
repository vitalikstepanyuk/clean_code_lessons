const { Tasks, AllPurposeSmeller } = require('./conditional_complexity.js');

test('Conditional complexity smell test', () => {
    let smeller = new AllPurposeSmeller;
    expect(smeller.task).toBe(Tasks.NONE);
    expect(smeller.doSomething(Tasks.TASK1)).toBeTruthy();
    expect(smeller.task).toBe(Tasks.TASK1);
    expect(smeller.doSomething(Tasks.TASK2)).toBeTruthy();
    expect(smeller.task).toBe(Tasks.TASK2);
    expect(smeller.doSomething(Tasks.TASK3)).toBeTruthy();
    expect(smeller.task).toBe(Tasks.TASK3);
    expect(smeller.doSomething(Tasks.TASK4)).toBeTruthy();
    expect(smeller.task).toBe(Tasks.TASK4);
    expect(smeller.doSomething(Tasks.TASK5)).toBeTruthy();
    expect(smeller.task).toBe(Tasks.TASK5);
});
