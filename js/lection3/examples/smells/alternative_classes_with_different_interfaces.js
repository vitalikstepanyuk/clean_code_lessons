class SomeSmeller {
    doSomeSmell() {
        console.log("doSomeSmell");
        return true;
    }
    doSomeOtherSmell() {
        console.log("doSomeOtherSmell");
        return true;
    }
    doSomeYetAnotherSmell() {
        console.log("doSomeYetAnotherSmell");
        return true;
    }
};

class SomeOtherSmeller {
    doSomeSimillarSmell() {
        console.log("doSomeSimillarSmell");
        return true;
    }
    doSomeOtherSimillarSmell() {
        console.log("doSomeOtherSimillarSmell");
        return true;
    }
};

module.exports = { SomeSmeller, SomeOtherSmeller };
