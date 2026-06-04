const { CoinGame, CommandChain, NextCommand } = require('./side_game.js');

test('Coin game test', () => {
    let game = new CoinGame();
    let score = game.score;
    let flips3 = new CommandChain(new NextCommand(game, 1), new NextCommand(game, 1), new NextCommand(game, 1));
    flips3.execute();
    expect(game.level).toEqual(3);
    expect(game.score).toBeGreaterThanOrEqual(score);
    console.log("score: " + game.score + " vs " + score);
});
