function sum(items) {
    let s = 0;
    items.forEach(a => s += a);
    return s;
}

class StrangeDictionary {
    #dict;
    #delta;
    constructor(dict, delta = 10) {
        this.#dict = dict;
        this.#delta = delta;
    }
    isSimilar(s1, s2) {
        if (s1 == s2) {
            return true;
        }
        return Math.abs(this.getWeight(s1) - this.getWeight(s2)) <= this.#delta;
    }
    getWeight(s) {
        let ms = this.#dict[0].get(s[0])
        if (ms == null) {
            ms = s[0];
        }
        let d = this.#dict[1].get(ms);
        if (d == null) {
            d = s[1];
        }
        return (d < 0 || s[1] < 0? -1 : 1) * Math.max(Math.abs(d), Math.abs(s[1]));
    }
    get similarityDelta() { return this.#delta; }
};

function isSimilarSmell(s1, s2) {
    return Math.abs(s1[0].getWeight(s1[1]) - s2[0].getWeight(s2[1])) <= Math.min(s1[0].similarityDelta, s2[0].similarityDelta);
}

// Introduce Parameter Object Method
// Extract Method
// Extract Class

module.exports = { sum, StrangeDictionary, isSimilarSmell };
