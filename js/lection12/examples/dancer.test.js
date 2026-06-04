const { HumanoidBot, DogBot, CountryDancer, HipHopDancer } = require('./dancer.js');

test('Dancer test', () => {
    let bot = new HumanoidBot();
    let dancer = new CountryDancer(bot);
    dancer.dance();
    expect(bot.position).toEqual({ x: 0, y: 0 });
    expect(bot.direction).toEqual({ x: 0, y: 1 });

    bot = new DogBot();
    dancer = new HipHopDancer(bot);
    dancer.dance();
    expect(bot.position).toEqual({ x: 0, y: 0 });
    expect(bot.direction).toEqual({ x: 0, y:1 });
});