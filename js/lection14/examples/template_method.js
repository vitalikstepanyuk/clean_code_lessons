class AbstractClass {
    templateMethod() {
        console.log("AbstractClass templateMethod");
        let result = true;
        result &= this._primitiveOperation1();
        result &= this._primitiveOperation2();
        return result;
    }

    _primitiveOperation1() {}
    _primitiveOperation2() {}
};

class ConcreteClass1 extends AbstractClass {
    _primitiveOperation1() {
        console.log("ConcreteClass1 primitiveOperation1");
        return true;
    }

    _primitiveOperation2() {
        console.log("ConcreteClass1 primitiveOperation2");
        return false;
    }
};

class ConcreteClass2 extends AbstractClass {
    _primitiveOperation1() {
        console.log("ConcreteClass2 primitiveOperation1");
        return true;
    }

    _primitiveOperation2() {
        console.log("ConcreteClass2 primitiveOperation2");
        return true;
    }
};

module.exports = { ConcreteClass1, ConcreteClass2 };
