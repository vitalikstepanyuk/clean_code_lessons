const { DivergentWorkflowSmeller } = require('./divergent_change.js');

test('Divergent change smell test', () => {
    let smeller = new DivergentWorkflowSmeller;
    expect(smeller.someWorkflowTemplate()).toBeTruthy();
});
