import { test } from '@playwright/test';

test.use
({
    //algumas coisas q podem ser colocadas aqui:
    //geolocation, httpCredentials, viewport, baseURL, javaScriptEnabled, screenshot, video...
    actionTimeout: 3000, // corresponde ao q pode ser settado na função browser.newContext()
    navigationTimeout: 5000,
    launchOptions: { slowMo: 2000, headless: true}, // essa propriedade está aninhada a browserType.launch() 
    timezoneId: 'America/New_York'
});


test('Teste 1', async ({ page }) => 
{
    await page.goto('');
    const zone = await getTimeZone(page);
    console.log(zone);
});

test.describe('Titulo do grupo', () => 
{

    test.use
    ({
        //se eu quiser que uma config seja aplicada apenas a um grupo describe, declaro ele aqui
        timezoneId: 'America/Toronto' // mais próximo do teste 'ganha', faz override do que foi passado acima 
    }); 

    test('Teste 2', async ({ page }) => 
    {
        await page.goto('');
        const zone = await getTimeZone(page); //passei um timezone antes, mas vai fazer override do q foi passado antes
        console.log(zone);
    });

});

async function getTimeZone(page)
{
    return await page.evaluate(() => Intl.DateTimeFormat().resolvedOptions().timeZone); //fetch de timezone 
}