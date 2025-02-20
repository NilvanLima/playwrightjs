import { test, expect } from "@playwright/test";

test('Teste de check-box', async ({ page }) => 
{
    await page.goto('/');

    const checkbox = page.getByRole('checkbox');
    const textarea = page.locator('#textarea');
    const msg = 'msg';

    await checkbox.check();

    await textarea.fill(msg);

    //falha pq o método toContainText() localiza o texto que está entre tags HTML
        //await expect(textarea).toContainText(msg);

    //se quisermos verificar o que foi escrito num input de texto, devemos usar o toHaveValue
    await expect(textarea).toHaveValue(msg);
});