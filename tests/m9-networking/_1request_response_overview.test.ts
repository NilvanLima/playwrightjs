import { test, expect } from '@playwright/test';

test('Request / Response overview', async ({ page }) => 
{
    const response = await page.goto('');

    if(response === null) return;

    console.log(response.url());
    console.log(response.status());
    console.log(response.ok());

    expect(response.ok()).toBeTruthy();

    console.log(await response.allHeaders()); //n vai retornar como array, mas como objeto com props: valores
    console.log(await response.headersArray()); // se quiser em formato de array

    console.log(await response.body()); //não é muito legível
    console.log(await response.text()); //mais legível

    //vai dar erro por esperar por JSON um arquivo .html
    // console.log(await response.json()); //vai dar erro se o payload não for parseable JSON

    // a info do JSON é capturada no momento de navegação da página e atrelada ao objeto de resposta
    const request = response.request();
    console.log(await request.allHeaders());
    console.log(request.method()); //método HTTP  || GET 
    //útil quando for escrever testes mistos = browser out pages e checa a camada HTTP ao mesmo tempo
});

//PW pode ser usado como ferramenta pura de testes de API, sem envolver a janela do browser
test('Request / Response', async ({ request }) => 
{
    //fixture 'request' = permite o meu script agir como um simples cliente HTTP, sem abrir o browser, é mais rapido por isso
    const response = await request.get('https://api.github.com/');

    console.log(response.ok());
    console.log(response.status());
    console.log(response.headersArray());
    console.log(await response.json()); //nesse caso vai funcionar com o JSON
});

