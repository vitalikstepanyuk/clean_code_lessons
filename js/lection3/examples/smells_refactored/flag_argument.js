function calculateOdd(value) {
    return value / 2;
}

function calculateEven(value) {
    return value % 2;
}

function check(value) {
    return value % 2 != 0;
}

function save(value) {
    console.log("saving: ", value);
    return true;
}

// Extract Method

module.exports = { calculateOdd, calculateEven, check, save };
