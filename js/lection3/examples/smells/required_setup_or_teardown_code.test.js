const { DBSmeller } = require('./required_setup_or_teardown_code.js');

test('Required setup or teardown code smell test', async () => {
    let smeller = new DBSmeller;
    smeller.openSmell();
    expect(smeller.isOpenedSmell).toBeTruthy();
    if (smeller.isOpenedSmell) {
        let result = await smeller.query("SELECT * FROM table");
        expect(result).toEqual(10);
        console.log("Result: ", result);
    }
    smeller.closeSmell();
    expect(smeller.isOpenedSmell).toBeFalsy();
});
