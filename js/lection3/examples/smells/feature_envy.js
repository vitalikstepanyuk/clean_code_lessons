class Date {
    #year;
    #month;
    #day;
    constructor(year, month, day) {
        this.#year = year;
        this.#month = month;
        this.#day = day;
    }
    get year() { return this.#year; }
    get month() { return this.#month; }
    get day() { return this.#day; }

    lessThan(date) {
        return this.#year < date.year || (this.#year === date.year && (this.#month < date.month || (this.#month === date.month && this.#day < date.day)));
    }
};

class VacationCalendarSmeller {
    #holidays;
    constructor(holidays) {
        this.#holidays = holidays;
    }
    countDayOffs(d1, d2) {
        let count = 0;
        let d = d1;
        while (d.lessThan(d2)) {
            if (VacationCalendarSmeller.#isWeekend(d) || this.#isHoliday(d)) {
                count++;
            }
            d = (d.day < VacationCalendarSmeller.#maxDayInMonthWithDate(d))? new Date(d.year, d.month, d.day + 1) : new Date(d.year, d.month + 1, 1);
        }
        return count;
    }

    #isHoliday(date) {
        return this.#holidays.find(d => d.year === date.year && d.month === date.month && d.day === date.day) != null;
    }
    static #isWeekend(date) {
        let w = VacationCalendarSmeller.#dayOfWeek(date);
        return w === 6 || w === 7;
    }
    static #maxDayInMonthWithDate(date) {
        let y = date.year;
        let m = date.month;
        if (m === 2) {
            return (y % 4 === 0 && y % 100 != 0) || y % 400 === 0 ? 29 : 28;
        }
        return m === 4 || m === 6 || m === 9 || m === 11 ? 30 : 31;
    }
    static #dayOfWeek(date) {
        let y = date.year;
        let d = VacationCalendarSmeller.#dayOfYear(date);
        // Gauss's algorithm - https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss's_algorithm
        let w = (d + 5*((y-1)%4) + 4*((y-1)%100) + 6*((y-1)%400))%7; // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
        return w === 0 ? 7 : w;
    }
    static #dayOfYear(date) {
        let y = date.year;
        let m = date.month;
        let days = date.day;
        for (let i = 1; i < m; i++) {
            days += VacationCalendarSmeller.#maxDayInMonthWithDate(new Date(y, i, 1));
        }
        return days;
    }
};

module.exports = { Date, VacationCalendarSmeller };
