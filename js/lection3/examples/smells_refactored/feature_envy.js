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

    dayOfYear() {
        let days = this.#day;
        for (let i = 1; i < this.#month; i++) {
            let d = new Date(this.#year, i, 1);
            days += d.maxDayInMonth();
        }
        return days;
    }
    dayOfWeek() {
        // Gauss's algorithm - https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss's_algorithm
        let w = (this.dayOfYear() + 5*((this.#year-1)%4) + 4*((this.#year-1)%100) + 6*((this.#year-1)%400))%7; // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
        return w === 0 ? 7 : w;       
    }
    isWeekend() { 
        let w = this.dayOfWeek();
        return w === 6 || w === 7;
    }
    maxDayInMonth() {
        if (this.#month === 2) {
            return (this.#year % 4 === 0 && this.#year % 100 != 0) || this.#year % 400 == 0 ? 29 : 28;
        }
        return this.#month === 4 || this.#month === 6 || this.#month === 9 || this.#month === 11 ? 30 : 31;
    }

    lessThan(date) {
        return this.#year < date.year || (this.#year === date.year && (this.#month < date.month || (this.#month === date.month && this.#day < date.day)));
    }

    next() {
        if (this.#day < this.maxDayInMonth()) {
            ++this.#day;
        } else {
            ++this.#month;
            this.#day = 1;
        }
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
            if (d.isWeekend(d) || this.#isHoliday(d)) {
                count++;
            }
            d.next();
        }
        return count;
    }

    #isHoliday(date) {
        return this.#holidays.find(d => d.year === date.year && d.month === date.month && d.day === date.day) != null;
    }
};

// + Inappropriate Static Smell resolved
// Move Method
// Rename Method
// Inline Temp

module.exports = { Date, VacationCalendarSmeller };
