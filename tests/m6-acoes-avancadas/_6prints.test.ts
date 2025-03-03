import { test, expect } from '@playwright/test';

test('Demonstração de print', async ({ page })=> 
{   
    page.goto('/');

    await page.getByRole('button', { name: 'Register'}).click();

    //ver o rolou, se não passar nenhum parametro, pode retornar o valor válido, que é uma promise de buffer q contém o dado do print
    // const s: Promise<Buffer> = page.screenshot();
    const s: Promise<Buffer> = page.screenshot(
    {
        //caso queira salvar o print no projeto
        // path: 'screenshot.png' // passar o nome do print se for só ele
        path: 'screenshots/screenshot.png' //além disso, pode passar um diretório
    }); 

    page.screenshot(
    {
        // path: 'screenshots/screenshot-advanced.png',
        path: 'screenshots/screenshot-advanced.jpeg', //jpeg se quiser 
        //customizar o tipo de print
        fullPage: true, //tira print da página toda ao invés da view port atual
        // 
        mask: await page.getByTestId('location').all() //esconder todos os elementos que tem o locator
    });

    await expect(page.locator('.invalid-feedback')).toHaveCount(4); //contador correto é 3, expect falso
});