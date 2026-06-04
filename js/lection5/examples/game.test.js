const {Game, FileSaver, AutoSaver} = require('./game.js');

test('Game test 1', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    if (!saver.isFileExists()) {
        let game = saver.load();
        expect(game.level).toEqual(1);
        expect(game.task.description.substring(0,27)).toEqual("You have got into a dungeon");
        expect(game.score).toEqual(10);
        let hint = game.getHint();
        expect(hint.cost).toEqual(5);
        expect(game.score).toEqual(5);
        let save = new AutoSaver(saver, game);
        save.after(() => {
            game.next(2);
        });
        expect(game.task.description.substring(0,6)).toEqual("Task12");
        expect(game.score).toEqual(15);
    }
});

test('Game test 2', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    let game = saver.load();
    expect(game.level).toEqual(2);
    expect(game.task.description.substring(0,6)).toEqual("Task12");
    expect(game.score).toEqual(15);
});
