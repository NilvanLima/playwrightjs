import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false}); // desabilita todo o JS incluindo o que já está hardcoded ou presente na página

test('Aborto de rotas - JS block', async ({ page }) => 
{
    //bloquear todos os arquivos JS sendo carregados, desabilitar essa funcionalidade
    // funciona para: **/*.{png, jpg, jpeg}
    page.route('**/*.{js}', route => route.abort()); //bloqueia o JS adicional sendo carregado e tendo efeito

    await page.goto('/savings.html');
    await page.getByTestId('deposit').fill('10');

    await expect(page.getByTestId('result')).not.toBeVisible();
});

test('Rota com uma condição', async ({ page }) => 
{
    await page.route('**/*', route => 
    {
        if(route.request().resourceType() === 'script')
        {
            route.abort();
        } 
        else 
        {
            route.continue();
        }
    });
    // ... 
});

test('Rota FulFill', async ({ page }) => 
{
    await page.route('**/*.pdf', route => 
    {
        route.fulfill
        ({
            status: 404,
            contentType: 'text/plain',
            body: 'Not Found!'
        });
    });

    await page.goto('/savings.html');
    await page.getByText('Download Our Offer').click();

    await page.screenshot({ path: 'route.png'});

    await page.waitForURL('**/*.pdf');

    const body = page.locator('body');

    await expect(body).toContainText('Not Found!');
});