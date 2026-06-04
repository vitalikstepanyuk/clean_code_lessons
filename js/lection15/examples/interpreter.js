class Context {
    #text;
    constructor(text) {
        this.#text = text;
    }
    get text() {
        return this.#text;
    }
};

class AbstractExpression {
    interpret(context) {
        return false;
    }
};

class Expression extends AbstractExpression {
    #left;
    #right;
    constructor(left, right) {
        super();
        this.#left = left;
        this.#right = right;
    }
    interpret(context) {
        return this.#left.interpret(context) || this.#right.interpret(context);
    }
};

class IAm extends AbstractExpression {
    #name;
    constructor(name) {
        super();
        this.#name = name;
    }
    interpret(context) {
        return context.text.includes("I am " + this.#name);
    }
};

class IHave extends AbstractExpression {
    #something;
    constructor(something) {
        super();
        this.#something = something;
    }
    interpret(context) {
        return context.text.includes("I have " + this.#something);
    }
};

module.exports = { Context, Expression, IAm, IHave };
