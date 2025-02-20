import { test, expect } from "@playwright/test";

const homeTitulo = 'Credit Association';
const savingsTitulo = 'Save with us';

test('Teste voltando, avançando e fazendo refresh ', async ({ page }) => 
{
    await page.goto('/');

    await page.goto('/savings.html');
    await expect(page).toHaveTitle(savingsTitulo);

    //só pra tornar o teste significativo colocou o expect de ter titulo
    await page.goBack();
    await expect(page).toHaveTitle(homeTitulo);

    await page.goForward();
    await expect(page).toHaveTitle(savingsTitulo);

    await page.reload();
    await expect(page).toHaveTitle(savingsTitulo);
});

test('Teste de navegação', async ({ page }) => 
{
    //load = inclui os recursos externos, a pag tá pronta pra ser usada
    //domcontentloaded não traz esses recursos externos
    //networkidle n é recomendado 
    //timeout pode ser usado para acessar a velocidade da página, incluindo notando o aumento da latencia ou deteriorização de velocidade 
    await page.goto('/', {waitUntil: 'load', timeout: 100});
    await expect(page).toHaveTitle(homeTitulo);
});

//afeta todos os testes SOMENTE nesse arquivo, setta o timeout de todos os testes do arquivo 
test.use({navigationTimeout: 8000});

test('Velocidade de carregamento enquanto navega', async ({ page }) => 
{
    await page.goto('/savings.html', { timeout: 5000});
    await expect(page).toHaveTitle(savingsTitulo);

    //páginas diferentes requerem timeouts diferentes
    await page.goBack({timeout: 8000});
    await expect(page).toHaveTitle(homeTitulo);

    await page.goForward();
    await expect(page).toHaveTitle(savingsTitulo);

    await page.reload();
    await expect(page).toHaveTitle(savingsTitulo);
});