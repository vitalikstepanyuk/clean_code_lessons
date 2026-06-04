# Refactoring Notes — `date.js`

## Code Smells found in the ORIGINAL implementation

```js
function date(year, day) {
    if (day <= 31) {                       // Conditional Complexity (long if/else chain)
        return (year, 1, day);             // BUG: comma operator -> returns only `day`
    } else if (day <= 31 + 28) {           // Magic Numbers (31, 28, 30...)
        return year, 2, day - 31;          // Duplicated Code (repeated subtractions)
    } else if (day <= 31 + 28 + 31) {      // Combinatorial Explosion of additions
        ...                                // Long Method
    }
}
```

Summary of smells:

- **BUG**: the comma operator made the function return a single number, never a date.
- **Conditional Complexity**: a 12-branch if/else ladder.
- **Magic Numbers**: month lengths (31/28/30) hard-coded all over the place.
- **Duplicated Code / Combinatorial Explosion**: cumulative sums and subtractions copy-pasted.
- **Primitive Obsession**: a date was represented as a loose tuple instead of a real type.
- **Missing Validation**: no leap-year handling and no input range checks.

## Refactoring methods applied

- **Replace Magic Number with Symbolic Constant** -> month lengths live in one array.
- **Replace Conditional with Loop** -> the if/else ladder becomes a single while loop.
- **Extract Class / Replace Data Value with Object** -> `Year` and `CalendarDate`.
- **Encapsulate** the leap-year rule inside `Year`.
- **Introduce a proper return type** (YYYY-MM-DD string via `toString`).
- **Introduce Assertion (Guard Clause)** -> validate the day-of-year range.
