const { Object, ObjectPool, withObject } = require('./object_pool.js');

test('ObjectPool test 1', () => {
    let obj1 = null, obj2 = null;
    withObject((object) => {
        obj1 = object;
        obj1.doSomething();
        withObject((object) => {
            obj2 = object;
            obj2.doSomething();
            expect(obj1).not.toBe(obj2);
        });
    });
    withObject((object) => {
        object.doSomething();
        expect(obj1).toBe(object);
        withObject((object) => {
            object.doSomething();
            expect(obj2).toBe(object);
        });
    });
});
