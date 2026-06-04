const { ChainedHandler1, ChainedHandler2, ChainedHandler3, Handler1, Handler2, Handler3, Chain } = require('./chain_of_responsibility.js');

test('Chain of Responsibility test1', () => {
    const h1 = new ChainedHandler1();
    const h2 = new ChainedHandler2(h1);
    const h3 = new ChainedHandler3(h2);

    expect(h3.handle("select * from users")).toBe("1 row:\n1, John, Doe");
    expect(h3.handle("grep John")).toBe("John Doe");
    expect(h3.handle("find john")).toBe("john_doe.txt");
    expect(h3.handle("rm -rf john_doe.txt")).toBe("");
});

test('Chain of Responsibility test2', () => {
    const chain = new Chain(new Handler1(), new Handler2(), new Handler3());

    expect(chain.handle("select * from users")).toBe("1 row:\n1, John, Doe");
    expect(chain.handle("grep John")).toBe("John Doe");
    expect(chain.handle("find john")).toBe("john_doe.txt");
    expect(chain.handle("rm -rf john_doe.txt")).toBe("");
});
