// Refactoring notes (smells found + methods applied) live in REFACTORING_NOTES.md

// Value object: encapsulates everything that depends on the year itself
// (leap-year rule and the resulting month lengths).
class Year {
    constructor(value) {
        this.value = value;
    }

    // Encapsulated leap-year rule (removes the Magic Number "28").
    isLeap() {
        const y = this.value;
        return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    }

    // Single source of truth for month lengths in a common (non-leap) year.
    // Kept as a static constant to avoid re-allocating the literal on every call.
    static BASE_MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Returns a fresh copy so callers cannot mutate the shared constant,
    // patching only February for leap years.
    monthLengths() {
        const months = [...Year.BASE_MONTH_LENGTHS];
        if (this.isLeap()) {
            months[1] = 29;
        }
        return months;
    }

    daysInYear() {
        return this.isLeap() ? 366 : 365;
    }
}

// Value object representing a calendar date and knowing how to format itself.
class CalendarDate {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    // Named constructor: builds a date from a day-of-year number.
    // Replaces the whole if/else ladder with a single loop over month lengths.
    static fromDayOfYear(year, dayOfYear) {
        const yearInfo = new Year(year);

        // Guard Clause: reject impossible day-of-year values up front.
        if (!Number.isInteger(dayOfYear) || dayOfYear < 1 || dayOfYear > yearInfo.daysInYear()) {
            throw new RangeError(`Day ${dayOfYear} is out of range for year ${year}`);
        }

        const months = yearInfo.monthLengths();
        let remaining = dayOfYear;
        let monthIndex = 0;

        while (remaining > months[monthIndex]) {
            remaining -= months[monthIndex];
            monthIndex += 1;
        }

        return new CalendarDate(year, monthIndex + 1, remaining);
    }

    // Produces the required YYYY-MM-DD format with zero-padding.
    toString() {
        const month = String(this.month).padStart(2, '0');
        const day = String(this.day).padStart(2, '0');
        return `${this.year}-${month}-${day}`;
    }
}

// Backward-compatible functional facade kept for the existing API.
function date(year, day) {
    return CalendarDate.fromDayOfYear(year, day).toString();
}

module.exports = { date, CalendarDate, Year };
