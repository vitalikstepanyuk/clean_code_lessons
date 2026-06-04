class DataGroup {
    constructor() {
        if (DataGroup.instance) {
            return DataGroup.instance;
        }
        DataGroup.instance = this;
        this.data1 = 1;
        this.data2 = 2;
        this.data3 = 3;
        this.data4 = 3.14;
        let updater = new Updater();
        updater.save();
    }
};

class Updater {
    constructor() {
        if (Updater.instance) {
            return Updater.instance;
        }
        Updater.instance = this;
    }
    save() {
        let d = new DataGroup();
        console.log(`${d.data1} ${d.data2} ${d.data3} ${d.data4}`);
        return true;
    }
    update() {
        let d = new DataGroup();
        d.data1 = 100;
        d.data2 = 200;
        d.data3 = 300;
        d.data4 = 314.15;
        return false;
    }
    doSomething() {
        let d = new DataGroup();
        d.data1 += 100;
        console.log(`Updater.doSomething() - ${d.data1}`);
    }
    doSomethingElse() {
        let d = new DataGroup();
        d.data2 += 200;
        console.log(`Updater.doSomethingElse() - ${d.data2}`);
    }
    doSomethingElseElse() {
        let d = new DataGroup();
        d.data3 += 300;
        console.log(`Updater.doSomethingElseElse() - ${d.data3}`);
    }
    doPiR2(r) {
        let d = new DataGroup();
        let square = d.data4 * r * r;
        console.log(`Updater.doPiR2(${r}) - ${square}`);
        return square;
    }
    do2PiR(r) {
        let d = new DataGroup();
        let perimeter = d.data4 * r * 2;
        console.log(`Updater.do2PiR(${r}) - ${perimeter}`);
        return perimeter;
    }
    // and so on and so on

    doEverythingPart1() {
        this.update();
        this.doSomething();
    }
    doEverythingPart2() {
        this.doSomethingElse();
        this.doSomethingElseElse();
    }
};

class Rectangle {
    #width;
    #height;
    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }

    get width() { return this.#width; }
    get height() { return this.#height; }

    get area() { return this.#width * this.#height; }
    get perimeter() { return 2 * (this.#width + this.#height); }

    resizeWidth(delta) {
        this.#width += delta;
    }
    resizeHeight(delta) {
        this.#height += delta;
    }
    resize(deltaWidth, deltaHeight) {
        this.resizeWidth(deltaWidth);
        this.resizeHeight(deltaHeight);
    }

    abFeature() {
        console.log("Rectangle.abFeature()");
    }
};

class Square extends Rectangle {
    constructor(side) {
        super(side, side)
    }
    get side() { return super.width; }
    resize(delta) {
        super.resize(delta, delta);
    }
    resizeWidth(delta) {
        super.resizeWidth(delta);
        super.resizeHeight(delta);
    }
    resizeHeight(delta) {
        super.resizeWidth(delta);
        super.resizeHeight(delta);
    }
    resize(deltaWidth, deltaHeight) {
        let sign = deltaWidth < 0 && deltaHeight < 0 ? -1 : 1;
        let delta = sign * Math.max(Math.abs(deltaWidth), Math.abs(deltaHeight));
        super.resizeWidth(delta);
        super.resizeHeight(delta);
    }

    get r1() { return this.side/2; }
    get r2() { return this.side * 0.7071; }
    get piR2() { let u = new Updater(); return u.doPiR2(this.r2); }

    abFeature() {
        super.abFeature();
        console.log("Square.abFeature()");
    }
};

function doSomethingWithRect(rect) {
    rect.resize(10, 20);
    console.log(`Area: ${rect.area}`);
    console.log(`Perimeter: ${rect.perimeter}`);
}

async function resizeSmoothly(rect, deltaWidth, deltaHeight) {
    return new Promise((resolve) => {
        for (let i = 0; i < 10; ++i) {
            if (deltaWidth != 0 && deltaHeight != 0) {
                rect.resize(deltaWidth*0.1, deltaHeight*0.1);
            } else if (deltaWidth != 0) {
                rect.resizeWidth(deltaWidth*0.1);
            } else if (deltaHeight != 0) {
                rect.resizeHeight(deltaHeight*0.1);
            }
        }
        resolve(true);
    });
}

class AroundSquare {
    #square;
    constructor(square) {
        this.#square = square;
    }
    get r1() { return square.r1(); }
    get r2() { return square.r2(); }
    get area() { return square.piR2(); }
};

class AreaThrower {
    get area() { throw new Error("Wrong class AreaThrower"); }
};

class PartialSquare {
    #figure;
    #parts;
    #valid;
    constructor(figure, parts) {
        this.#figure = figure;
        this.#parts = parts;
        this.#valid = true;
    }
    get area() {
        let area = 0;
        try {
            area = this.#figure.area / this.#parts;
        } catch (e) {
            this.#valid = false;
        }
        return area;
    }
    get valid() { return this.#valid; }
};

module.exports = { DataGroup, Updater, Rectangle, Square, doSomethingWithRect, resizeSmoothly, AreaThrower, PartialSquare };
