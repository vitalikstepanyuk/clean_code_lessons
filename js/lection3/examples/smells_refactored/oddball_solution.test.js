const { SQLClient, NoSQLClient, connectionWrapper } = require('./oddball_solution.js');

test('Oddball solution fix test', async () => {
    await connectionWrapper(new SQLClient("localhost", 5432), async (sqlClient) => {
        let sqlRow = await sqlClient.request("SELECT * FROM profiles WHERE name = 'John Connar'");
        expect(sqlRow.substring(9, 20)).toEqual("John Connar");
    });
    await connectionWrapper(new NoSQLClient("localhost", 27017), async (noSqlClient) => {
        let nosqlRecord = await noSqlClient.request("John Connar");
        expect(nosqlRecord.substring(7, 18)).toEqual("John Connar");
    });
});
