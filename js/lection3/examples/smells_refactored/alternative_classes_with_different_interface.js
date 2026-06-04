class Something {
    doSomething() {
        console.log("doSomething common");
        return true;
    }
    doSomeOtherThing() {
        console.log("doSomeOtherThing common");
        return true;
    }
};

class SomethingAdditional extends Something {
    doSomeYetAnotherThing() {
        console.log("doSomeYetAnotherThing");
        return true;
    }
};

class SomethingExtra extends Something {
    doSomeOtherThing() {
        let result = super.doSomeOtherThing();
        console.log("doSomeOtherThing");
        result &= true; // some extra work result
        return result;
    }
};

// Extract Superclass
// Pull Up Method
// Rename Method

module.exports = { SomethingAdditional, SomethingExtra };
