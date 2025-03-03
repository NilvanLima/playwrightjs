import { test, expect } from '@playwright/test';

const name = 'Peteca';

test ('Teste de dialog - o tratamento padrão é descartar', async ({ page }) => 
{
    await page.goto('/');

    const input = page.getByLabel('First name');
    await input.fill(name);
    await expect(input).toHaveValue(name);

    //teste que serve para mostrar que o PW descarta dialog por padrão
    await page.getByRole('button', { name: 'Clear'}).click();
    await expect(input).toHaveValue(name);
});

test ('Teste de dialog - Ok ou dispensar', async ({ page }) => 
{
    //lidando com eventos de dialog
    //primeiro parametro e o segundo parametro é uma função onde dizemos que dado um dialog, é aceito
    //podemos renomear o dialog se quisermos:
    // page.on('dialog', popup => popup.accept());
    //se quisermos usar o listener só uma vez e voltar pra config padrão, podemos usar
    // page.once('dialog', dialog => dialog.accept()); // vai acontecer só uma vez
    page.on('dialog', dialog => dialog.accept()); //tem outras funções possiveis que podemos chamar
    await page.goto('/');

    const input = page.getByLabel('First name');
    await input.fill(name);

    await page.getByRole('button', { name: 'Clear'}).click();
    //espero que o valor do input seja vazio
    await expect(input).toHaveValue('');
});
