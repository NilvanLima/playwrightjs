import { test } from '@playwright/test';

//dá pra aplicar o skip no container do describe 
test.describe.skip('Feature grupo A', () => {

    test('Teste A.1', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste A.1');
    });
        
    test('Teste A.2', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste A.2');
    });
});

test.describe('Feature grupo B', () => {
    
    //skip aqui condicionalmente

    //jeito errado:
    // test.skip(browserName === 'chromium', 'Não funciona no Chromium, ticket ABC-123');
    
    //jeito certo 
    test.skip(({ browserName}) => browserName === 'chromium', 'mensagem opcional');

    test('Teste B.1', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste B.1');       
    });

    test('Teste B.2', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste B.2');      
    });
});

