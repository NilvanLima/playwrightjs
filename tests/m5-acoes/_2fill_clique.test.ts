import { test, expect } from "@playwright/test";

test('Teste de preenchimento', async ({ page }) => 
{
    await page.goto('/');
    
    await page.getByLabel('First name').fill('Nilvan');

    //deve quebrar pelo formato de data
    // await page.getByLabel('Date of birth').fill('10-10-2025');

    //erro arrumado quando trocamos o formato
    await page.getByLabel('Date of birth').fill('2025-10-10');
});

test('Demo de cliques', async ({ page }) => 
{
    await page.goto('/');

    const btn = page.getByRole('button', { name: 'Register'});

    //queremos clicar várias vezes num elemento (opção 1)
    await btn.click();
    await btn.click();
    await btn.click();
    //...

    //opção 2 
    for (let i = 0; i < 5; i++)
    {
        await btn.click();
    }

    //opção 3 (mais limpa)
    await btn.click({clickCount: 5});
    //posso escolher pra ser o botão direito
    //vai ativar o context menu do browser, que não temos acesso porque não faz parte do DOM da página
    await btn.click({button: 'right'}); //se pressionar shift + clique no 'button', leva a gente pra ver os tipos de cada parametro

    //double click tem função especial
    await btn.dblclick();
    
});