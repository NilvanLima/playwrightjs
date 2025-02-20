import { test, expect } from '@playwright/test';

test('Checando o console', async ({ page }) => 
{
    //conselho é escrever depois de navegar p pág ou até antes de navegar p pág, vai capturar todos eventos logo no começo
    //captura 3 mensanges, tem de ser 4 (que é uncaught exception)
    page.on('console', msg => 
    {
        console.log(msg);
        expect.soft(msg.type()).not.toEqual('error'); //assert
    });

    //pegar uncaught exceptions, agora pega os 4 eventos, dá pra escrever algumas assertions com isso...
    page.on('pageerror', error => 
    {
        console.log(`Encontrei um erro: ${error.name}, ${error.message}`);
        expect.soft(error.name).not.toEqual('Error'); //assert com diferença de captalização 'Error' com o assert acima
    });

    page.goto('/');

    await page.getByRole('button', { name: 'Register'}).click();

    //vai engatilhar os eventos no console
    //se rodar aqui vai falhar, não vai printar nada, tem que registrar o listener antes de performar a ação
    // page.on('console', msg => console.log(msg));
});