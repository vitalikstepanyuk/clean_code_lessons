class Iterator {
    hasNext() {
        return false;
    }
    next() {
        return null;
    }
    current() {
        return null;
    }
};

class Aggregate {
    createIterator() {
        return null;
    }
};

class Post extends Object {
    #title;
    #content;
    constructor(title, content) {
        super();
        this.#title = title;
        this.#content = content;
    }
    get title() {
        return this.#title;
    }
    get content() {
        return this.#content;
    }
    toString() {
        return this.#title + '\n' + this.#content;
    }
};

class NewsPage extends Aggregate {
    static #TODAY = [
        new Post("The first private spacewalk in SpaceX mission", "Private-citizen astronauts traveling with SpaceX completed the first commercial spacewalk, pushing new boundaries for the Elon Musk-led company."),
        new Post("Ukrainian defence intelligence destroy Russian fighter jet over Black Sea", "Officers from a special unit from Defence Intelligence of Ukraine (DIU) have destroyed a Russian Su-30SM warplane by a hit from a man-portable air defence system during an operation in the Black Sea."),
        new Post("Defence Intelligence of Ukraine blows up Russian soldiers involved in torturing Ukrainians", "In Russia, soldiers of the National Guard of the Russian Federation, who were involved in organizing torture camps in the occupied territories of Ukraine, were neutralized.")
    ];
    #posts;
    constructor(posts = NewsPage.#TODAY) {
        super();
        this.#posts = posts;
    }

    createIterator() {
        return new NewsIterator(this);
    }
    getPost(index) {
        return this.#posts[index];
    }
    get length() {
        return this.#posts.length;
    }
};

class NewsIterator extends Iterator {
    #news;
    #index;
    constructor(news) {
        super();
        this.#news = news;
        this.#index = 0;
    }
    hasNext() {
        return this.#index + 1 < this.#news.length;
    }
    next() {
        return this.#news.getPost(++this.#index);
    }
    current() {
        return this.#news.getPost(this.#index);
    }
};

module.exports = { Object, Iterator, Aggregate, Post, NewsPage, NewsIterator };
