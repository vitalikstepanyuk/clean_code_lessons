const { Task } = require('./tight_coupled_game.js');

test('Tight coupled game test', () => {
    let task = new Task("lection5/examples/task1.txt");
    expect(task.description.substring(0,27)).toEqual("You have got into a dungeon");
    let task2 = task.next(2);
    expect(task2.description.substring(0,6)).toEqual("Task12");
    task2.save("lection5/examples/save1.txt");
    let task12 = Task.load("lection5/examples/save1.txt");
    expect(task12.description).toEqual(task2.description);
});
