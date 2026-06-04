function calculateSmell(value, likeOdd) {
    if (likeOdd) {
        return value / 2;
    } else {
        return value % 2;
    }
}

function checkAndSaveSmell(value) {
    let ok = value % 2 != 0;
    if (ok) {
        console.log("saving: ", value);
        ok = true;
    }
    return ok;
}

module.exports = { calculateSmell, checkAndSaveSmell };
