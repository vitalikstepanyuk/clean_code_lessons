const { Game, FileSaver, AutoSaver, GameFacade, CommandChain, SimpleCheatCommand, SwitchGameCommand, NextCommand } = require('./main_game.js');

test('Game Autoplay test', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    if (!saver.isFileExists()) {
        let game = saver.load();
        expect(game.level).toEqual(1);
        let autoplay = new CommandChain(new NextCommand(game, 2)/* ,...*/);
        autoplay.execute();
        expect(game.history).toEqual("12");
        expect(game.task.description[0]).toEqual("Task12");
    }
});

test('Game test 1', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    if (!saver.isFileExists()) {
        let game = saver.load();
        expect(game.level).toEqual(1);
        expect(game.task.description[0].substring(0,27)).toEqual("You have got into a dungeon");
        expect(game.score).toEqual(10);
        let hint = game.takeHint();
        expect(hint.cost).toEqual(5);
        expect(game.score).toEqual(5);
        let save = new AutoSaver(saver, game);
        save.after(() => {
            game.next(2);
        });
        expect(game.task.description[0].substring(0,6)).toEqual("Task12");
        expect(game.score).toEqual(15);
    }
});

test('Game test 2', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    let game = saver.load();
    expect(game.level).toEqual(2);
    expect(game.task.description[0].substring(0,6)).toEqual("Task12");
    expect(game.score).toEqual(15);
});

test('Game test 3', async () => {
    let game = new GameFacade();
    await new Promise(r => setTimeout(r, 1000));
    let scene = game.start();
    const isNew = scene.includes("You have got into a dungeon");
    const isLoaded = scene.includes("Task12");
    expect(isNew || isLoaded).toBeTruthy();
    console.log(scene);
}, 5000);

test('Cheat game test', () => {
    let saver = new FileSaver("lection5/examples/save2.txt");
    let game = saver.load();
    let history = game.history;
    let score = game.score;
    let cheat1 = new SimpleCheatCommand(game);
    cheat1.execute();
    expect(game.history).toEqual(history);
    expect(game.score).toBeGreaterThan(score);
    console.log("score: " + game.score + " vs " + score);
    score = game.score;
    let cheat2 = new CommandChain(new SwitchGameCommand(game), 
                                  new NextCommand(game, 1),
                                  new NextCommand(game, 1),
                                  new NextCommand(game, 1),
                                  new NextCommand(game, 0));
    cheat2.execute();
    expect(game.history).toEqual(history);
    expect(game.score).toBeGreaterThanOrEqual(score);
    console.log("score: " + game.score + " vs " + score);
});
