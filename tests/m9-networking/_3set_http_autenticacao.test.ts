import { expect, test } from '@playwright/test';

// 1) criar um repositório via web API
// 2) ir pela UI e checar se existe

const REPO = 'Playwright-test-repo';

test.use
({
    baseURL: 'https://api.github.com/',
    extraHTTPHeaders: 
    {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token_space`
    }
});

test.beforeEach('Criando um repositório', async ({ request }) => 
{
    //camada da API
    const response = await request.post('user/repos', 
    {
        // headers: 
        // {
        //     'Accept': 'application/vnd.github.v3+json',
        //     'Authorization': `token_space`
        // },

        data: 
        {
            name: REPO
        }
    });

    expect(response.ok()).toBeTruthy();
});

test('Trabalhando com um novo repositório criado', async ({ page }) => 
{
    //camada da UI 
    await page.goto('https://github.com/NilvanLima?tab=repositories');

    await expect(page.getByRole('link', { name: REPO })).toHaveCount(1);

   // outras ações com um repositório novo, limpo, whatever
});


test.afterEach('Deletando o repositório', async ({ request }) => 
{
    const response = await request.delete(`repos/NilvanLima/${REPO}`, 
    {
        // headers: 
        // {
        //     'Accept': 'application/vnd.github.v3+json',
        //     'Authorization': `token_space`
        // } //refactor pra não ter o código duplicado, passando as infos numa propriedade no .use()
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status() === 204);
});

