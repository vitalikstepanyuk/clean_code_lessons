const { DocumentView, DraftDocument, ArchivedDocument, draftLock, publish, archive, restore, Document } = require('./combinatorial_explosion.js');

test('Combinatorial explosion fix test', () => {
    let draft = new DraftDocument("mydoc1.txt");
    draftLock(draft, "me", () => {
        draft.insert("My Document Content");
    });
    expect(draft.content).toEqual("My Document Content");

    let view = publish(draft, "https://documentary.mine/mydoc");
    expect(view.url).toEqual("https://documentary.mine/mydoc");
    expect(view.content).toEqual("My Document Content");

    let archived = archive(view);
    expect(archived.id).toEqual(0x10000);
    expect(archived.content).toEqual("My Document Content");

    let restored = restore(archived);
    expect(restored.url).toEqual("https://documentary.mine/mydoc");
    expect(restored.content).toEqual("My Document Content");
});

test('Combinatorial explosion fix fsm test 2', () => {
    let document = new Document("mydoc2.txt");
    expect(document.insert("My Document Content")).toBeFalsy();
    draftLock(document, "me", () => {
        document.insert("My Document Content");
    });
    expect(document.content).toEqual("My Document Content");

    document.publish("https://documentary.mine/mydoc");
    expect(document.url).toEqual("https://documentary.mine/mydoc");
    expect(document.content).toEqual("My Document Content");
    expect(document.insert("Modified ")).toBeFalsy();

    document.archive();
    expect(document.id).toEqual(0x10000);
    expect(document.insert("Modified ")).toBeFalsy();

    document.restore();
    expect(document.id).toEqual(0);
    expect(document.insert("Modified ")).toBeFalsy();
});
