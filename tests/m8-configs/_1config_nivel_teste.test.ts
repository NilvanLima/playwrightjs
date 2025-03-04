import { test, chromium } from '@playwright/test';

test('Playwright: top-level API', async ({ playwright}) => 
{
    //uso de fixtures como 'page', 'browserName', browser e context
    //tem a fixture de alto nível = 'playwright', podemos pegar browser diferentes dessa fixture
    const firefoxType = await playwright.firefox.launch();
    const ctx = await firefoxType.newContext();
    const page = await ctx.newPage();

    await page.goto('');
    
    const chromium = await playwright.chromium.launch();
    //...
});

test('Config de browser / context ', async () => 
{
    const browser = await chromium.launch
    ({
        //algumas coisas que podemos configurar pra instancia do browser
        headless: false,
        slowMo: 2000,
        downloadsPath: 'seu/caminho'
    });

    //local, timezoneId e etc são configurados a nível de contexto
    const context = await browser.newContext
    ({
        //mais comuns da perspectiva do professor:
        baseURL: 'https://google.com',
        timezoneId: 'America/New_York',
        locale: 'es-ES',
        geolocation: { longitude: 12.492507, latitude: 41.889938 },
        viewport: {width: 1000, height: 500},
        javaScriptEnabled: true, //padrão, pode desabilitar
        acceptDownloads: true //padrão, pode desabilitar
    });

    //depois de instanciar o browser e criar o contexto, daí fica legal fazer as coisas
    const page = await context.newPage();
    await page.goto('');
    await page.getByRole('button', {name: 'Buscar con Google'}).click();
});