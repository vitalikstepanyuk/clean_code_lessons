const { dbWrapper } = require('./required_setup_or_teardown_code.js');

test('Required setup or teardown code fix test', async () => {
    dbWrapper(async (connection) => {
        let result = await connection.query("SELECT * FROM table");
        expect(result).toEqual(10);
        result = await connection.query("SELECT * FROM otherTable");
        expect(result).toEqual(10);
    });
});
