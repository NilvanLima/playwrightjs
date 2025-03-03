import { test, expect} from '@playwright/test';

//skip incondicional, feito dessa forma skippa todos os testes do arquivo
//test.skip();

//.skip vai fazer o test runner skippar esse teste
test.skip('Não vai rodar', async () => 
{
    console.log('Esse não deveria ser printado')
});

test('Pular (in)condicional', async ({ page, browserName}) => 
{
    //param 1 = browser que deve ser pulado, param 2 = descrição, por que deve ser skippado
    test.skip(browserName === 'chromium', 'Não funciona no Chromium, ticket ABC-123');

    //n se limita a browser, qualquer expressão booleana rola 
    test.skip(await page.getByTestId('someId').count() === 0, 'Pulando porque pelo menos 1 elemento X deve estar presente');
});

//skip especial, declara um teste que deve ser arrumado e vai ser marcado como 'skipped' quando rodado
test.fixme('Teste fixme', async () => 
{

});

test('Teste que vai falhar', async () => 
{
    //esse tipo não pode ser usado no nível superior (test container), tem de ser colocado dentro do teste
    //não marca o teste como falho automático, seria algo do tipo 'o teste DEVERIA falhar' 
    test.fail();

    // expect(3).toEqual(3); // falha 'Expected to fail, but passed.' 
    expect(2).toEqual(3); // passa 
});