import { test, expect } from "@playwright/test";

test('Teste com assertions', async ({ page }) => 
{
    await page.goto('/');
    await expect(page).toHaveTitle('Credit Association');

    const checkbox = page.getByRole('checkbox');
    const textarea = page.locator('#textarea');
    const message = 'Recomendado por um amigo';

    await expect(textarea).toBeDisabled();
    await expect(textarea).toBeEmpty();

    await checkbox.check();
    await expect(textarea).toBeEnabled();

    await textarea.fill(message);
    await expect(textarea).toHaveValue(message);

    await page.getByRole('button', { name: 'Register'}).click();

    const feedback = page.locator('.invalid-feedback');
    await expect(feedback).toHaveCount(3);

    for (const message of await feedback.all())
    {
        await expect(message).toBeVisible();
    }

    await expect(feedback.first()).toContainText('Valid first name is required');
});

test('Teste com matchers negativos', async ({ page }) => 
{
    await page.goto('/');

    await expect(page.getByTestId('location')).toContainText('New York');

    //match negativo, podemos colocar o .not quase onde quisermos
    await expect(page.getByTestId('location')).not.toContainText('London');
});

test('Teste com soft assertions', async ({ page }) => 
{
    await page.goto('/');

    //normal ou hard assertions falham o teste imediatamente
    //adicionar o .soft vai manter o teste rodando
    await expect.soft(page.getByTestId('location')).toContainText('Mumbai'); //para o teste se falhar 
    await expect.soft(page.getByTestId('location')).toContainText('Tokyo');

    await expect(page.getByTestId('location')).toContainText('New York');
});