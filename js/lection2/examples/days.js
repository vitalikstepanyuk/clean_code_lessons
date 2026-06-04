class GregorianDate {
    #year;
    #month;
    #day;
    #dayOfYear;
    static #internalConstructing = false;
    constructor(year, month, day, dayOfYear=0) {
        if (!GregorianDate.#internalConstructing) {
            throw new TypeError("GregorianDate is not constructable. Use GregorianDate.create() instead.");
        }
        GregorianDate.#internalConstructing = false;
        this.#year = year;
        this.#month = month;
        this.#day = day;
        this.#dayOfYear = dayOfYear;
    }
    static get begin() {
        GregorianDate.#internalConstructing = true;
        return new GregorianDate(1582, 10, 4, 277);
    }
    static create(year, month, day) {
        GregorianDate.#internalConstructing = true;
        let date = new GregorianDate(year, month, day);
        let modified = date.#normalize();
        return [date, !modified];
    }
    static createFromString(str) {
        let [year, month, day] = str.split('-').map(Number);
        return GregorianDate.create(year, month, day);
    }
    get year() {
        return this.#year;
    }
    get month() {
        return this.#month;
    }
    get day() {
        return this.#day;
    }
    get dayOfYear() {
        return this.#dayOfYear;
    }
    #isLeapYear() {
        return this.#year % 4 === 0 && (this.#year % 100 !== 0 || this.#year % 400 === 0);
    }
    #isLongMonth() {
        return [1, 3, 5, 7, 8, 10, 12].includes(this.#month);
    }
    #maxDayOfMonth() {
        return this.#month === 2 ? this.#isLeapYear() ? 29 : 28 : this.#isLongMonth() ? 31 : 30;
    }
    #normalize() {
        let begin = GregorianDate.begin;
        if (this.#year < begin.year || 
            (this.#year === begin.year && this.#month < begin.month) || 
            (this.#year === begin.year && this.#month === begin.month && this.#day <= begin.day)) {
            this.#year = begin.year;
            this.#month = begin.month;
            this.#day = begin.day;
            this.#dayOfYear = begin.dayOfYear;
            return true;
        }
        let normalized = this.#normalizeMonth();
        normalized |= this.#normalizeDay();
        this.#recalcDayOfYear();
        return normalized;
    }
    #normalizeMonth() {
        if (this.#month < 1) {
            this.#month = 1;
            return true;
        }
        if (this.#month > 12) {
            this.#month = 12;
            return true;
        }
        return false;
    }
    #normalizeDay() {
        if (this.#day < 1) {
            this.#day = 1;
            return true;
        }
        let maxDays = this.#maxDayOfMonth(this.#month);
        if (this.#day > maxDays) {
            this.#day = maxDays;
            return true;
        }
        return false;
    }
    #recalcDayOfYear() {
        this.#dayOfYear = this.#day;
        for (let i = 1; i < this.month; i++) {
            GregorianDate.#internalConstructing = true;
            let date = new GregorianDate(this.year, i, 1);
            this.#dayOfYear += date.#maxDayOfMonth();
        }
    }
};

module.exports = { GregorianDate };
