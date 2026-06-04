remoteDocumentary = new Map([[ "https://documentary.mine/mydoc", "Document Content" ]]);

class DocumentView {
    #url;
    #authors;
    #content;
    constructor(url) {
        this.#authors = new Set();
        this.reload(url);
    }
    get url() {
        return this.#url;
    }
    get content() {
        return this.#content;
    }
    get authors() {
        return this.#authors;
    }

    reload(url) {
        this.#url = url;
        this.#content = DocumentView.#load(url);
    }

    static #load(url) {
        /*... load to local cache*/
        /*... parse content and authors list from cache*/ 
        let content = remoteDocumentary.get(url);
        return content != null? content : "";
    }

    save(url) {
        remoteDocumentary.set(url, this.#content);
        this.#url = url;
        return true;
    }
};

class DraftDocument extends DocumentView {
    #lockedBy;
    #cursor;
    #history;
    constructor(url) {
        super(url);
        this.#lockedBy = "";
        this.#cursor = 0;
        this.#history = [];
    }

    get editor() {
        return this.#lockedBy;
    }

    lock(author) {
        if (!DraftDocument.#addEditor(this.url, author)) {
            throw new Error("Modification is forbidden");
        }
        let lockedBy = DraftDocument.#getLockedBy(this.url);
        if (lockedBy != "" && lockedBy != author) {
            throw new Error("Already locked by " + lockedBy);
        }
        /*... update lockedBy to remote */
        this.#lockedBy = author;
    }

    unlock() {
        /*... clear lockedBy on remote */
        this.#lockedBy = "";
        this.save();
    }

    insert(text) {
        if (this.content.length + text.length > 5000) {
            return false;
        }
        this.#history.push([this.#cursor, text]);
        return true;
    }

    save(url = null) {
        let newUrl = url? url : this.url;
        this.#flush();
        if (!this.#upload(newUrl)) {
            return false;
        }
        super.reload(newUrl);
        return true;
    }

    #flush() {
        /*... save in-memory to local cache file*/
    }
    #upload(to) {
        /* pseudo flash here as not really working with local cache files */
        let content = this.content;
        let cursor = 0;
        this.#history.forEach(([pos, text]) => {
            content = content.slice(0, cursor + pos) + text + content.slice(cursor + pos);
            cursor += text.length;
        });
        this.#history = [];
        /*... upload to service*/
        remoteDocumentary.set(to, content);
        return true;
    }

    static #addEditor(url, author) {
        /*... validate remotely*/
        return true;
    }
    static #getLockedBy(url) {
        /*... get lockedBy from remote*/
        return "";
    }
};

function draftLock(document, author, editFn) {
    document.lock(author);
    try {
        return editFn();
    } finally {
        document.unlock();
    }
}

function publish(document, url) {
    if (!document.save(url)) {
        throw new Error("Failed to save the document");
    }
    return new DocumentView(url);
}

class ArchivedDocument extends DocumentView {
    #id;
    constructor(id) {
        super(ArchivedDocument.resolveId2Url(id));
        this.#id = id;
    }
    get id() { return this.#id; }

    static resolveUrl2Id(url) {
        /*... resolve url to id */
        return 0x10000;
    }
    static resolveId2Url(id) {
        /*... resolve id to url to load */
        return "https://documentary.mine/mydoc";
    }
};

function archive(document) {
    if (!document instanceof DocumentView) {
        return null;
    }
    /*... put to remote archive*/
    return new ArchivedDocument(ArchivedDocument.resolveUrl2Id(document.url));
}

function restore(document) {
    if (!document instanceof ArchivedDocument) {
        return null;
    }
    /*... restore from remote archive*/
    return new DocumentView(document.url);
}

// Extract Class/Extract Superclass/Extract Subclass
// Extract Method
// Pull Up Method
// Push Down Method
// Push Down Field
// Introduce Foreign Method
// Replace Type Code with Subclasses
// Replace Error Code with Exception

const { sm } = require('jssm');

class PreviewState {
    constructor(state, document) {
        this.state = state;
        this.document = document;
    }
    get url() { return this.document.url; }
    get content() { return this.document.content; }
    get authors()  { return this.document.authors; }
    get id() { return 0; }
    lock(author) {
        if (this.state.fsm.transition('Locked')) {
            let draft = new DraftDocument(this.url);
            draft.lock(author);
            this.state.current = new LockedState(this.state, draft);
            return true;
        }
        return false;
    }
    unlock() { return false; }
    insert(text) { return false; }
    save(url) { return false; }
    publish(url) {
        if (this.state.fsm.transition('Published')) {
            this.state.current = new PublishedState(this.state, publish(this.document, url));
            return true;
        }
        return false;
    }
    archive() { return false; }
    restore() { return false; }
};

class LockedState {
    constructor(state, document) {
        this.state = state;
        this.document = document;
    }
    get url() { return this.document.url; }
    get content() { return this.document.content; }
    get authors()  { return this.document.authors; }
    get id() { return 0; }
    lock(author) { return false; }
    unlock() {
        if (this.state.fsm.transition('Preview')) {
            this.document.unlock();
            this.state.current = new PreviewState(this.state, new DocumentView(this.url));
            return true;
        }
        return false;
    }
    insert(text) { return this.document.insert(text); }
    save(url) { return this.document.save(url); }
    publish(url) {
        if (this.state.fsm.transition('Published')) {
            this.document.unlock();
            this.state.current = new PublishedState(this.state, publish(this.document, url));
            return true;
        }
        return false;
    }
    archive() { return false; }
    restore() { return false; }
};

class PublishedState {
    constructor(state, document) {
        this.state = state;
        this.document = document;
    }
    get url() { return this.document.url; }
    get content() { return this.document.content; }
    get authors()  { return this.document.authors; }
    get id() { return 0; }
    lock(author) { return false; }
    unlock() { return false; }
    insert(text) { return false; }
    save(url) { return false; }
    publish(url) { return false; }
    archive() {
        if (this.state.fsm.transition('Archived')) {
            this.state.current = new ArchivedState(this.state, archive(this.document));
            return true;
        }
        return false;
    }
    restore() { return false; }
};

class ArchivedState {
    constructor(state, document) {
        this.state = state;
        this.document = document;
    }
    get url() { return this.document.url; }
    get content() { return this.document.content; }
    get authors()  { return this.document.authors; }
    get id()  { return this.document.id; }
    lock(author) { return false; }
    unlock() { return false; }
    insert(text) { return false; }
    save(url) { return false; }
    publish(url) { return false; }
    archive() { return false; }
    restore() {
        if (this.state.fsm.transition('Published')) {
            this.state.current = new PublishedState(this.state, restore(this.document));
            return true;
        }
        return false;
    }
};

class Document {
    #state;
    constructor(url) {
        this.#state = { fsm : sm`Preview -> Published -> Archived -> Published;
                                Preview -> Locked; Locked -> Preview;`,
                        current : null };
        this.#state.current = new PreviewState(this.#state, new DocumentView(url));
    }
    get url() { return this.#state.current.url; }
    get content() { return this.#state.current.content; }
    get authors()  { return this.#state.current.authors; }
    get id()  { return this.#state.current.id; }
    lock(author) { return this.#state.current.lock(author); }
    unlock() { return this.#state.current.unlock(); }
    insert(text) { return this.#state.current.insert(text); }
    save(url) { return this.#state.current.save(url); }
    publish(url) { return this.#state.current.publish(url); }
    archive() { return this.#state.current.archive(); }
    restore() { return this.#state.current.restore(); }
};

// Replace Conditional with 'Polymorphism'
// State Pattern, FSM

module.exports = { DocumentView, DraftDocument, ArchivedDocument, draftLock, publish, archive, restore, Document };
