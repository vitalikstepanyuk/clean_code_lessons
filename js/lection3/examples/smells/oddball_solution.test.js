const { SQLClient, NoSQLClient } = require('./oddball_solution.js');

test('Oddball solution smell test', async () => {
    let sqlClient = new SQLClient("localhost", 5432);
    sqlClient.connectSmell();
    let sqlRow = await sqlClient.querySmell("SELECT * FROM profiles WHERE name = 'John Connar'");
    expect(sqlRow.substring(9, 20)).toEqual("John Connar");
    sqlClient.closeSmell();

    let noSqlClient = new NoSQLClient("localhost", 27017);
    noSqlClient.connectSmell();
    let nosqlRecord = await noSqlClient.querySmell("John Connar");
    expect(nosqlRecord.substring(7, 18)).toEqual("John Connar");
    noSqlClient.closeSmell();
});
