import { test, expect } from "@playwright/test";

test('Testes de select', async ({ page }) => 
{
    //na pág tem valores capitalizados, uns como string da div e outros como id
    await page.goto('/savings.html');

    const deposito = page.getByTestId('deposit');
    const periodo = page.getByTestId('period');
    const resultado = page.getByTestId('result');

    await deposito.fill('100');

    await periodo.selectOption('6 Months');

    //aqui o 'toContainText' é a opção certa
    await expect(resultado).toContainText('After 6 Months you will earn $2.00 on your deposit');

    //parametro label é mais restritivo
    await periodo.selectOption({label: '1 year'});
    await expect(resultado).toContainText('After 1 Year you will earn $5.00 on your deposit');
});