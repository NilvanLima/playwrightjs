import { test } from '@playwright/test';

test.describe('Feature grupo A', () => {

    test('Teste A.1', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste A.1');
    });
        
    test('Teste A.2', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste A.2');
    });
});

test.describe('Feature grupo B', () => {
    
    test('Teste B.1', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste B.1');       
    });

    test('Teste B.2', async ({ page }) => 
    {
        await page.goto('');
        console.log('Teste B.2');      
    });
});

