import { test } from '@playwright/test';

test('Cookies', async ({ page })=> 
{
    await page.goto('/');

    //ler cookies na sessão atual
    console.log(await page.context().cookies());

    //adicionar 1 ou mais cookies, especificar o nome e 
    await page.context().addCookies
    ([{
        name: 'cookie1',
        value: 'abc',
        url: 'https://playwright.dev/'
    }]);

    console.log(await page.context().cookies());

    //limpar os cookies
    await page.context().clearCookies();
    console.log(await page.context().cookies());

    //vai retornar um array vazio, antes de settar os cookies e então o set do cookies e depois do clear dos cookies
});