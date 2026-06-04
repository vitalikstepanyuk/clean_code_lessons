class Document {    
    static #SUCCESS = 0;
    static #NO_PERMISSIONS = 1;
    static #WRONG_STATE = 2;
    static #LOCKED = 3;
    static #EXCEED_LIMITS = 4;
    static #UNSYNCED = 5;
    static #DRAFT = 10;
    static #PUBLISHED = 11;
    static #ARCHIVED = 12;
    static get SUCCESS() { return Document.#SUCCESS; }
    static get NO_PERMISSIONS() { return Document.#NO_PERMISSIONS; }
    static get WRONG_STATE() { return Document.#WRONG_STATE; }
    static get LOCKED() { return Document.#LOCKED; }
    static get EXCEED_LIMITS() { return Document.#EXCEED_LIMITS; }
    static get UNSYNCED() { return Document.#UNSYNCED; }
    static get DRAFT() { return Document.#DRAFT; }
    static get PUBLISHED() { return Document.#PUBLISHED; }
    static get ARCHIVED() { return Document.#ARCHIVED; }

    #state;
    #url;
    #cache;
    #content;
    #cursor;
    #id;
    #editor;
    #lockedBy;
    #authors;
    constructor(state, url) {
        this.#state = state;
        this.#url = url;
        this.#content = Document.#load(url);
        this.#cursor = [0, 0];
        this.#id = 0;
        this.#editor = "me";
        this.#lockedBy = "";
        this.#authors = new Set();
        this.#addAuthor(this.#editor);
    }

    static editDraft(url) {
        let document = new Document(Document.DRAFT, url);
        document.lock();
        return document;
    }

    static previewDraft(url) {
        return new Document(Document.DRAFT, url);
    }

    static viewPublished(url) {
        return new Document(Document.PUBLISHED, url);
    }

    static viewArchived(id) {
        return new Document(Document.ARCHIVED, Document.#resolveId(id));
    }

    lock() {
        if (this.#state != Document.DRAFT) {
            return Document.WRONG_STATE;
        }
        let lockedBy = this.lockedBy
        if (lockedBy != "" && lockedBy != this.#editor) {
            return Document.LOCKED;
        }
        if (!this.#authors.has(this.#editor)) {
            return Document.NO_PERMISSIONS;
        }
        /*... sync */
        this.#lockedBy = this.#editor;
        return Document.SUCCESS;
    }

    unlock() {
        if (this.#state != Document.DRAFT) {
            return Document.WRONG_STATE;
        }
        if (this.#lockedBy != this.#editor) {
            return Document.NO_PERMISSIONS;
        }
        /*... sync */
        this.#lockedBy = "";
        return Document.SUCCESS;
    }

    get lockedBy() {
        /*... sync */
        return this.#lockedBy;
    }

    publish(url) {
        if (this.#state != Document.DRAFT) {
            return Document.WRONG_STATE;
        }
        if (this.#lockedBy != "" && this.#lockedBy != this.#editor) {
            return Document.LOCKED;
        }
        if (this.#isExceedLimits()) {
            return Document.EXCEED_LIMITS;
        }
        if (!this.#authors.has(this.#editor)) {
            return Document.NO_PERMISSIONS;
        }
        let err = this.save(url);
        if (err != Document.SUCCESS) {
            return err;
        }
        this.#state = Document.PUBLISHED;
        return Document.SUCCESS;
    }

    archive() {
        if (this.#state != Document.PUBLISHED) {
            return Document.WRONG_STATE;
        }
        this.#state = Document.ARCHIVED;
        this.#id = 0x10000;
        return Document.SUCCESS;
    }

    restore() {
        if (this.#state != Document.ARCHIVED) {
            return Document.WRONG_STATE;
        }
        this.#state = Document.PUBLISHED;
        this.#id = 0;
        return Document.SUCCESS;
    }

    get id() {
        return this.#id;
    }

    save(url) {
        if (this.#state != Document.DRAFT) {
            return Document.WRONG_STATE;
        }
        if (this.#lockedBy != "" && this.#lockedBy != this.#editor) {
            return Document.LOCKED;
        }
        if (this.#isExceedLimits()) {
            return Document.EXCEED_LIMITS;
        }
        if (!this.#authors.has(this.#editor)) {
            return Document.NO_PERMISSIONS;
        }
        this.#flush();
        if (!this.#upload(url)) {
            return Unsynced;
        }
        this.#url = url;
        return Document.SUCCESS;
    }

    get url() {
        return this.#url;
    }

    get content() {
        return this.#content;
    }

    insert(text) {
        if (this.#state != Document.DRAFT) {
            return Document.WRONG_STATE;
        }
        if (this.#lockedBy != "" && this.#lockedBy != this.#editor) {
            return Document.LOCKED;
        }
        if (this.#isExceedLimits()) {
            return Document.EXCEED_LIMITS;
        }
        if (!this.#authors.has(this.#editor)) {
            return Document.NO_PERMISSIONS;
        }
        this.#content = this.#content.substring(0, this.#cursor[0]) + text + this.#content.substring(this.#cursor[1]);
        this.#cursor[0] = this.#cursor[1] += text.length;
        return Document.SUCCESS;
    }

    static #load(url) {/*... load to local cache and read cache */ return "Document Content"; }

    static #resolveId(id) {/*... resolve id to url to load */ return "https://..."; }

    #flush() {/*... save in-memory to local cache file*/}
    #upload(to) {/*... upload to service*/ return true; }

    #addAuthor(author) {/*... sync */ this.#authors.add(author);}

    #isExceedLimits() { return this.#content.length > 5000; }
};

module.exports = { Document };
