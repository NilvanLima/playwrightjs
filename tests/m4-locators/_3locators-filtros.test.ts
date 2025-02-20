import { test } from '@playwright/test';

test ('Demonstração do filtro', async ({ page }) => 
{
    await page.goto('/savings.html');

    //vai pegar 3 rows da pág sem especificar
    const rows = page.getByRole('row');
    console.log(await rows.count());

    //quero pegar 1 role especifica = Competition, uso o .filter() e passo o Competition {hasText: 'Competition'}
    //vai retornar todo o texto disso
    const row = page.getByRole('row')
        .filter({hasText: 'Competition'});
    console.log(await row.textContent());

    //pegar 1 célula especifica 
    const cell = page.getByRole('row')
        .filter({hasText: 'Competition'})
        .getByRole('cell')
        .nth(1); //começa do 0 então pega o index 2 = 2%
    console.log(await cell.textContent());
});