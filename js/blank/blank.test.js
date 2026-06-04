const { blank } = require('./blank.js');

test('Blank test', () => {
    console.log = jest.fn();
    expect(blank()).toBeTruthy();
    expect(console.log).toHaveBeenCalledWith('Blank');
});
