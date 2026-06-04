const { Context, Expression, IAm, IHave } = require('./interpreter.js');

test('Interpreter test1', () => {
    const expression = new Expression(new IAm("John Doe"), new IHave("a dog"));
    const context = new Context("I am John Doe and I have a dog");
    expect(expression.interpret(context)).toBe(true);
});

/*Ліна Костенко – Крила

А й правда, крилатим ґрунту не треба.  
Землі немає, то буде небо.  
Немає поля, то буде воля.  
Немає пари, то будуть хмари.  
В цьому, напевно, правда пташина…  
А як же людина? А що ж людина?  
Живе на землі. Сама не літає.  
А крила має. А крила має!  
Вони, ті крила, не з пуху-пір'я,  
А з правди, чесноти і довір'я.  
У кого – з вірності у коханні.  
У кого – з вічного поривання.  
У кого – з щирості до роботи.  
У кого – з щедрості на турботи.  
У кого – з пісні, або з надії,  
Або з поезії, або з мрії.  
Людина нібито не літає…  
А крила має. А крила має!
*/

test('Interpreter test2', () => {
    const expression = new Expression(new IHave("a wings"), 
        new Expression(new IHave("a sky"),
        new Expression(new IHave("a clouds"),
        new Expression(new IHave("a freedom"),
        new Expression(new IAm("a human"),
        new Expression(new IHave("a will"),
        new Expression(new IHave("a hope"),
        new IHave("a dream"))))))));

    const context = new Context("I have a wings; I have a sky; I have a clouds; I have a freedom; I am a human; I have a will; I have a hope; I have a dream;");
    expect(expression.interpret(context)).toBe(true);

    const context2 = new Context("I have a land; I have a breath;");
    expect(expression.interpret(context2)).toBe(false);
});
