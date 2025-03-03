import { test } from '@playwright/test';

//fullyParallel tem q estar como false no arquivo de global config 

//vai rodar o grupo todo parelelamente
test.describe.parallel('Grupo da feature A', async () => 
{
    test('Teste 1 ', async () => {});
    test('Teste 2 ', async () => {});
    test('Teste 3 ', async () => {});
    test('Teste 4 ', async () => {});
    test('Teste 5 ', async () => {});
    test('Teste 6 ', async () => {});
});