import {test, expect} from '@playwright/test';

test('Exemplo de locators genericos', async ({page}) => 
{   
    await page.goto('/');

    await page.locator('.needs-validation label[for="firstName"]').fill('Thaisinha');

    //locator usando xpath no css
    await page.locator('//form//button[2]').click();

    await expect(page.getByText('Valid last name is required')).toBeVisible();
});