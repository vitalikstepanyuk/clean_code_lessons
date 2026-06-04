const { sum, StrangeDictionary, isSimilarSmell } = require('./long_parameter_list.js');

test('Long parameter list fix test', () => {
    let s = sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(s).toEqual(55);
    let synonyms = new Map([ ["awersome", "good"], ["excellent", "good"], ["great", "good"], ["awful", "bad"], ["terrible", "bad"] ]);
    let weights = new Map([ ["good", 10], ["bad", -10], ["awersome", 9], ["great", 8], ["excellent", 5], ["awful", -6], ["terrible", -4] ]);
    let dict = new StrangeDictionary([synonyms, weights], 1);
    expect(dict.isSimilar(["awersome", 5], ["great", 3])).toBeTruthy();
    expect(dict.isSimilar(["awersome", 5], ["awful", -5])).toBeFalsy();
    let weights2 = new Map([ ["good", 15], ["bad", -10], ["awersome", 9], ["great", 8], ["excellent", 5], ["awful", -6], ["terrible", -4] ]);
    let dict2 = new StrangeDictionary([synonyms, weights2], 5);
    expect(isSimilarSmell([dict, ["awersome", 5]], [dict2, ["great", 3]])).toBeFalsy();
    expect(isSimilarSmell([dict, ["awersome", 5]], [dict2, ["awful", -5]])).toBeFalsy();
});
