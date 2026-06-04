const { sumSmell, isSimilarSmell } = require('./long_parameter_list.js');

test('Long parameter list smell test', () => {
    let s = sumSmell(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    expect(s).toEqual(55);
    let synonyms = new Map([["awersome", "good"], ["excellent", "good"], ["great", "good"], ["awful", "bad"], ["terrible", "bad"]]);
    let weights = new Map([["good", 10], ["bad", -10], ["awersome", 9], ["great", 8], ["excellent", 5], ["awful", -6], ["terrible", -4]]);
    expect(isSimilarSmell(synonyms, weights, "awersome", 5, "great", 3, 1)).toBeTruthy();
    expect(isSimilarSmell(synonyms, weights, "awersome", 5, "awful", -5, 1)).toBeFalsy();
});
