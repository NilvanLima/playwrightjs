import { test, chromium, devices } from '@playwright/test';

const iPad = devices['iPad Pro 11'];

const slowEHeadless = { headless: false, slowMo: 2000 };
// const doisSegundos = 2000;

//conselho do professor: se tem valores primitivos duplicados, refatore ex: timeouts, slowMo em vários testes

//código exemplo 
interface LocationData 
{
    latitude: number;
    longitude: number;
}

const localizacaoCoordenadas: Record<string, LocationData> = 
{
    Londres: { latitude: 51.509865, longitude: -0.118092 },
    Roma: { latitude: 41.9027835 , longitude: 12.4963655},
}

const londres = localizacaoCoordenadas['Londres'];
const roma = localizacaoCoordenadas['Roma'];

test('Teste 1', async () => 
{
    const browser = await chromium.launch(slowEHeadless);

    const context = await browser.newContext
    ({
        // geolocation: {longitude: -0.118092, latitude: 51.509865} sem refactor 
        geolocation: {longitude: londres.longitude, latitude: londres.latitude} //com refactor 
    });
});

test('Teste 2', async () => 
{
    const browser = await chromium.launch(slowEHeadless);

    const context = await browser.newContext
    ({
        //ao invés de passar valores hardcoded, podemos usar os valores do objeto do dispositivo:
        viewport: iPad.viewport,
        userAgent: iPad.userAgent,
        deviceScaleFactor: iPad.deviceScaleFactor,
        locale: 'en_GB',
        geolocation: { longitude: londres.longitude, latitude: londres.latitude },
        permissions: ['geolocation'] //condendendo permissão a oq é injetado, tem uma lista imensa do q pode ser passado nessa propriedade, na documentação...
        //dá pra usar esse contexto acima numa constante, é uma ideia
    });

    const page = await context.newPage();

    await page.goto('https://maps.google.com');
    await page.getByRole('button', { name: 'Stay on web'}).click();
    await page.screenshot({ path: 'London-iPad.png'});
    //não vai considerar a geolocation passada a principio, requer quer seja passada a propriedade 'permissions' 
});