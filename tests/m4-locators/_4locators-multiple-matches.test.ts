import { test, expect } from '@playwright/test';

test ('Falha com multiplos matches', async ({ page }) => 
{
    await page.goto('/');

    //PW vai achar vários então vai quebrar, tem de ser 1 só
    await page.getByRole('link').click();
});

test ('Matchs multiplos - primeiro, último, nth', async ({page}) => 
{
    await page.goto('/');

    //se eu espero multiplos matches, ex: fetch 3 botões num form
    //salvar o locator numa const, colocar o first, last e nth
    //código mais curto mas, frágil, uma mudança no html desses botões vai mudar a ordem e quebrar a lógica dos testes 
    const buttons = page.getByRole('button');

    console.log(await buttons.first().textContent());
    console.log(await buttons.last().textContent());
    console.log(await buttons.nth(1).textContent());
});

test ('Teste de multiplos matches - contar ou iterar', async ({page}) => 
{
    await page.goto('/');
    await page.getByRole('button', {name: 'Register'}).click();

    //procurando por todas validações no Register
    const feedback = page.locator('.invalid-feedback');

    //esperamos ter count ser 3
    await expect(feedback).toHaveCount(3);

    //outro caso de uso é ITERAR tudo que localizamos e performar uma ação, um loop resolve
    //invocar a função all() para converter o locator único num array de locators
    for(const message of await feedback.all())
    {
        //podemos usar o click, outras ações...
        console.log(`${await message.textContent()}`);
    }
});
