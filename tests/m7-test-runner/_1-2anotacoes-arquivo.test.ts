import { test } from '@playwright/test';

test.skip();
//se skip() estiver descomentado, 4 skips
//se não, 1 skip, 2 pass, 1 fail 

test('Não vai rodar 1 ', async () => 
{
    console.log('Teste 1');
});

test('Não vai rodar 2 ', async () => 
{
    console.log('Teste 2');
});

//teste com fixme
test.fixme('Não vai rodar 3 ', async () => 
{
    console.log('Teste 3');
});

//teste com fail()
test('Não vai rodar 4', async () => 
{
    test.fail();
    console.log('Teste 4');
});

