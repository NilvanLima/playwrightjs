import { test, expect } from '@playwright/test';

const pessoas = ['João', 'Maria'];

for (const nome of pessoas)
{
    //vai reclamar do título duplicado, solução é interpolar pra não dar erro de título
    test(`Testando ${nome}`, async () => 
    {
        console.log(nome);
    });
}

//tenho vários valores q quero usar pros testes, criar e popular um map
const map1 = new Map();
map1.set(2, 20);
map1.set(3, 30);

//iterar sob o map 
for (const [chave, valor] of map1)
{
    test(`testando 10x a funcionalidade com ${chave} e ${valor}`, async () => 
    {
        expect(chave * 10).toEqual(valor);
    });
}

//se tivermos mais valores: ideal é ter em um arquivo .csv, mas se quiser deixar no código: array de array
const inputs = 
[
    ["a", 1, 2],
    ["b", 3, 4],
    ["c", 5, 6]
];

for (const [a, b, c] of inputs) 
{
    test(`testando com ${a}, ${b} e ${c}`, async () => 
    {
        console.log(a, b, c);
    });
}

//dummy test
const inputs2 = 
[
    ["10", "6 months", "After 6 Months you will earn $0.20 on your deposit"],
    ["20", "1 Year", "After 1 Year you will earn $1.00 on your deposit"]
]

for (const [soma, periodo, resultado] of inputs2)
{
    test(`testando com ${soma}, ${periodo} e ${resultado}`, async ({ page }) => 
    {
        await page.goto('/savings.html');
        await page.getByTestId('deposit').fill(soma);
        await page.getByTestId('period').selectOption(periodo);
        
        await expect(page.getByTestId('result')).toHaveText(resultado);
    });
}