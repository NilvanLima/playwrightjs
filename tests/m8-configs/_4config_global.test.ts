import { test } from '@playwright/test';

test.use({ headless: false});

test('Teste 1', async ({ page }) => 
{
    await page.goto('');
    await page.goBack();
    console.log("teste");
    //ir na seção do playwright, selecionar os projetos (pra rodar no plugin)
});