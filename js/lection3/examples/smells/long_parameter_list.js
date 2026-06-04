function sumSmell(a, b, c, d, e, f, g, h, i, j) {
    return a + b + c + d + e + f + g + h + i + j;
}

function isSimilarSmell(m1, m2, s1, i1, s2, i2, d) {
    if (s1 == s2) {
        return true;
    }
    let ms1 = m1.get(s1)
    if (ms1 == null) {
        ms1 = s1;
    }
    let d1 = m2.get(ms1);
    if (d1 == null) {
        d1 = i1;
    }
    let ms2 = m1.get(s2);
    if (ms2 == null) {
        ms2 = s2;
    }
    let d2 = m2.get(ms2, i2);
    if (d2 == null) {
        d2 = i2;
    }
    d1 = (d1 < 0 || i1 < 0? -1 : 1) * Math.max(Math.abs(d1), Math.abs(i1));
    d2 = (d2 < 0 || i2 < 0? -1 : 1) * Math.max(Math.abs(d2), Math.abs(i2));
    return Math.abs(d1 - d2) <= d;
}

class StrangeDictionarySmeller {
    #synonyms;
    #weights;
    #delta;
    constructor(synonyms, weights, delta = 10) {
        this.#synonyms = synonyms;
        this.#weights = weights;
        this.#delta = delta;
    }
    isSimilarSmell(s1, d1, s2, d2) {
        return isSimilarSmell(this.#synonyms, this.#weights, s1, d1, s2, d2, this.#delta);
    }
};

module.exports = { sumSmell, isSimilarSmell, StrangeDictionarySmeller };
