import { expect, test } from '@playwright/test';

test('Monitorando trafego HTTP', async ({ page }) => 
{
    page.on('request', request => console.log(`>>${request.method()}, ${request.url()}`));

    page.on('response', response => console.log(`<<${response.status()}, ${response.url()}`));

    await page.goto('');
});

test('Testando trafego HTTP', async ({ page }) => 
{
    page.on('response', response => 
    {
        // expect(response.status()).toBeLessThan(300); //só da 1 erro pro primeiro script que não existe no index.html
        //pra ver todos os erros com a ação:
        // expect.soft(response.status()).toBeLessThan(300); //só da 1 erro pro primeiro script que não existe no index.html
        
        //com mensagens que ajudam 
        expect.soft(response.status(), 
        `Resposta com status ${response.status()} para a URL: ${response.url()}`).toBeLessThan(300); //só da 1 erro pro primeiro script que não existe no index.html
    });  
    await page.goto('');
});