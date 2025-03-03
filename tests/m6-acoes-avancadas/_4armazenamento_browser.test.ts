import { test, expect } from '@playwright/test';

const name = 'Peteca';

test('Armazenamento - teste da perspectiva de UI', async ({ page })=> 
{
    await page.goto('/');

    //inputa algo, recarrega e recarrega a pág sem salvar
    const input = page.getByLabel('First name');
    await input.fill(name);
    await page.reload();
    await expect(input).toHaveValue('');

    //inputa de novo, salva, recarrega e checa se o valor é preservado
    input.fill(name);
    await page.getByRole('button', { name: 'Save Input'}).click();
    await page.reload();
    await expect(input).toHaveValue(name);
});

test('Armazenamento local', async ({ page })=> 
{
    await page.goto('/');
    page.getByLabel('First name').fill(name);
    await page.getByRole('button', { name: 'Save Input'}).click();

    //chamar a função context() e obter um snapshot do estado do armazenamento local
    const armazenamento = await page.context().storageState();

    //obtemos o estado pelo context() do mesmo jeito como é feito com cookies
    //ler os cookies do objeto de storage
    console.log(armazenamento.cookies);

    //armazenamento local é um pouco 'escondido', está no array de origins, tem que pegar o primeiro index e settar o local storage
    console.log(armazenamento.origins[0].localStorage); //sem jeito de settar ou limpar o estado de armazenamento? resposta > _5... 
    //gera um local storage que é read only
    //a ideia é manipular o armazenamento local
});

//manipular e invocar js customizado
test('Armazenamento de sessão (ou Local)', async ({ page })=> 
{
    await page.goto('/');

    const input = page.getByLabel('First name');
    input.fill(name);
    await page.getByRole('button', { name: 'Save Input'}).click();

    //pra rodar um pedaço de js, só é preciso colocar ele dentro da função evaluate()
    //isso aq é js vanilla, não é código playwright 
    const armazenamento = await page.evaluate(() => window.localStorage); //pega o local storage do objeto global window, retorna um resultado
    console.log(armazenamento);

    // limpar 
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
    await expect(input).toHaveValue(''); //checando se o valor é vazio, deveria ser o efeito de limpar o armazenamento 

    // definição de estado
    await page.evaluate(setArmazenamentoLocal); //se for um pedaço grande de código é melhor colocar numa função e passar aqui...
    await page.reload();
    await expect(input).toHaveValue('Nilvs'); // checando se o valor é preenchido no input 
});

test('Armazenamento de sessão', async ({ page })=> 
{
    await page.goto('/');
    
    const input = page.getByLabel('First name');
    input.fill(name);
    await page.getByRole('button', { name: 'Save Input'}).click();
    
    const armazenamento = await page.evaluate(() => window.sessionStorage); //pega o session storage do objeto global window, retorna um resultado
    console.log(armazenamento);
    
    // limpar 
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    await expect(input).toHaveValue('');
    
    // definição de estado
    await page.evaluate(setArmazenamentoLocal);
    await page.reload();
    await expect(input).toHaveValue('Nilvs');
    
    //ir no src > js > index.js e settar onde tiver localStorage para sessionStorage
});
    
function setArmazenamentoLocal() 
{
    localStorage.setItem('firstName', 'Nilvs');
    sessionStorage.setItem('firstName', 'Nilvs');
};