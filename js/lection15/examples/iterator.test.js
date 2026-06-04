const { NewsPage, NewsIterator } = require('./iterator.js');

test('Iterator test', () => {
    const news = new NewsPage();
    expect(news.length).toBe(3);
    const it1 = news.createIterator();
    expect(it1.hasNext()).toBe(true);
    expect(it1.current().toString().substring(0, 27)).toBe("The first private spacewalk");
    expect(it1.next().toString().substring(0, 30)).toBe("Ukrainian defence intelligence");
    const it2 = new NewsIterator(news);
    expect(it2.hasNext()).toBe(true);
    expect(it2.current().toString().substring(0, 27)).toBe("The first private spacewalk");
    while (it2.hasNext()) {
        expect(it2.next().toString().includes("Intelligence")).toBe(true);
    }
});
