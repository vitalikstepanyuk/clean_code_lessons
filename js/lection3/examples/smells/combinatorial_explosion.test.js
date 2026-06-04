const { Document } = require('./combinatorial_explosion.js');

test('Combinatorial explosion smell test', () => {
    let doc = Document.editDraft("mydoc.txt");
    doc.insert("My ");
    expect(doc.content).toEqual("My Document Content");

    doc.publish("https://documentary.mine/mydoc");
    expect(doc.url).toEqual("https://documentary.mine/mydoc");
    expect(doc.insert("Modified ")).toEqual(Document.WRONG_STATE);

    doc.archive();
    expect(doc.id).toEqual(0x10000);
    doc.restore();
    expect(doc.id).toEqual(0);
});
