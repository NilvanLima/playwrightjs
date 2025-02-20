import {test, chromium} from '@playwright/test';

test('Teste com fixture', async ({page}) => 
{
    await page.goto('https://playwright.dev/');

    console.log('Conteúdo textual: ', await page.title());
});

test('Outro com fixture', async ({browserName, browser, context, page}) => 
//tem de ter as chaves {} pra funcionar ^
{
    const page1 = await context.newPage();
    const page2 = await context.newPage();
});