import { test } from '@playwright/test';

//fullyParallel tem q estar como false no arquivo de global config 
//fullyParallel: false = vai rodar com 1 worker
//fullyParallel: true = roda com mais workers

//se quisermos afetar todos os testes do arquivo =
// test.describe.configure({ mode: 'parallel'}); //pode ficar em qualquer lugar do arquivo, preferivel ser no começo

//não é recomendado p escrever testes interdependentes onde 1 teste setta as coisas ou limpa as coisas para o outro teste 
test.describe.configure({ mode: 'serial'}); 

test('Teste 1', async () => 
{
    console.log('Teste 1');
});

test('Teste 2', async () => 
{
    console.log('Teste 2');
});

test('Teste 3', async () => 
{
    console.log('Teste 3');
});

test('Teste 4', async () => 
{
    console.log('Teste 4');
});

test('Teste 5', async () => 
{
    console.log('Teste 5');
});
test('Teste 6', async () => 
{
    console.log('Teste 6');
});