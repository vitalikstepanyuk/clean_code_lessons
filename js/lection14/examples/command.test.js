const { Receiver, ConcreteCommand, CommandChain, Invoker, ScheduledTask } = require('./command.js');

test('Command test1', () => {
    let receiver = new Receiver();
    let invoker = new Invoker();
    invoker.setCommand(new CommandChain(new ConcreteCommand(receiver), new ConcreteCommand(receiver)));
    invoker.executeCommand();
    expect(receiver.state).toEqual(2);
});

test('Command test2', async () => {
    let receiver = new Receiver();
    let scheduledTask = new ScheduledTask(receiver);
    await scheduledTask.run();
    expect(receiver.state).toEqual(1);
}, 5000);
