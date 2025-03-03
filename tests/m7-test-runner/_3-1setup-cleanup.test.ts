import { test, expect } from '@playwright/test';

//2 testes que vão navegar pra home page 

//roda 1 vez só para todos os testes nesse arquivo, antes de todos os testes, setup global
test.beforeAll('Descrição significativa', async ({}) => 
{
    console.log('Antes de todo o setup');
});

//roda antes de cada teste, setup pro primeiro teste
test.beforeEach('Descrição significativa', async ({ page }) => 
{
    console.log('Antes de cada setup');
    page.goto('');
});

test('Teste 1', async ({ page }) =>
{
    console.log('Teste 1');
    await expect(page.getByRole('button')).toHaveCount(3);
});

test('Teste 2', async ({ page }) =>
{
    console.log('Teste 2');
    await expect(page.getByRole('checkbox')).toHaveCount(1);
});

//temos também essas funções p limpar 

//limpeza pra cada teste
test.afterEach('Descrição significativa', async ({ page }) => 
{
    console.log('Depois de cada setup');
});

//limpeza global
test.afterAll('Descrição significativa', async ({}) => 
{
    console.log('Depois de todo o setup');
});