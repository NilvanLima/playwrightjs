import {test, expect } from '@playwright/test';

test('Asserção simples', async () => 
{
    expect('a').toEqual('a');
    expect(2).toBeLessThan(3);
    expect(null).toBeFalsy;
});


test('Teste com simples auto-retrying assertions', async ({page}) => 
{
    await page.goto('http://localhost:3000/');

    // expect(page.getByTestId('location')).toContainText('New York');
    // se tiver um await, vai demorar mais, mas o teste mas vai passar 
    
    await expect(page.getByTestId('location')).toContainText('New York');

    await expect(page).toHaveTitle('Credit Association');
    await expect(page).toHaveURL('http://localhost:3000/');

    // await expect(page.getByText('Register')).
    // passando um locator pra um elemento, vai ter assertions diferentes, vou ter acesso a outras funções q fazem sentido pra oq eu tô usando.
});