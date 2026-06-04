const { Something, SomeProvider, SomeChanger, SomeWorkflowTemplate } = require('./divergent_change.js');

test('Divergent change fix test', () => {
    let workflow = new SomeWorkflowTemplate;
    expect(workflow.something.value).toEqual(10);
});
