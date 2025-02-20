import { test, expect } from '@playwright/test';

test ('Recommended built-in locators examples', async ({page}) =>
{
    await page.goto('');

    //retorna um objeto locator, pode salvar como variável ou const, só é um locator, não é uma promise então não precisa de um 'await'
    //só preciso fazer 1 vez
    const firstName = page.getByLabel('First name');

    //praticamente todas ações de usuários retornam uma promise então esperamos por elas 'await'
    await firstName.fill('Thais');
    await firstName.clear();

    //chain a ação do usuário em 1 linha, await a linha toda
    //não tá esperando pelo locator, mas pela ação fill no fim da linha 
    await page.getByLabel('First name').fill('Thais Tolledo');

    //page object > função getByRole > button (argumento1) > especificar com o nome do atributo e função .click()
    //podemos salvar numa variável ou invocar uma ação diretamente, como abaixo:
    // await page.getByRole('button', {name: 'Register'}).click();

    //exact vai fazer o locator case sensitive e demandar a string toda ser identica
    await page.getByRole('button', {name: 'Register', exact: true}).click();

    //getByText
    const warning = page.getByText('Valid last name is required');

    await expect(warning).toBeVisible();
});