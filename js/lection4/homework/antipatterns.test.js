const { DataGroup, Updater, Rectangle, Square, doSomethingWithRect, resizeSmoothly, AreaThrower, PartialSquare } = require('./antipatterns.js');

test('Antipatterns test 1', () => {
    let updater = new Updater();
    updater.doEverythingPart1();
    updater.doEverythingPart2();
    let data = new DataGroup();
    expect(data.data1).toEqual(200);
    expect(data.data2).toEqual(400);
    expect(data.data3).toEqual(600);
    expect(Math.abs(data.data4 - 3.1415)).toBeGreaterThan(0.1);
});

test('Antipatterns test 2', () => {
    let square = new Square(10);
    doSomethingWithRect(square);
    expect(square.area).toEqual(900);

    let promises = [resizeSmoothly(square, 10, 0), 
                    resizeSmoothly(square, -10, -0)];
    Promise.all(promises).then(() => {
        expect(square.area).toEqual(900);
    });
});


test('Antipatterns test 3', () => {
    let a = new AreaThrower;
    let p = new PartialSquare(a, 0);
    let area = p.area;
    expect(p.valid).toBeFalsy();
    expect(area).toEqual(0);
});
