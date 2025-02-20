import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Baixar um único arquivo e assert', async ({ page })=> 
{
    await page.goto('/savings.html');

    //a principio falha pq não tem evento de download emitido
    //se o arquivo tiver uma pré-visualização, o browser vai navegar p outra pág
    //dá pra trocar o tipo de arquivo no savings.html pra .zip (q não tem preview)
    //jeito pra rodar o .pdf é deixar o PW em modo headless (deixar em .pdf de novo) 
    //.pdf > playwright.config.ts > remover/comentar a config 'headless:false'
    const downloadPromise = page.waitForEvent('download');

    await page.getByText('Download Our Offer').click();

    const download = await downloadPromise;

    //oq fazer com o objeto de download
    const nomeArquivoSugerido = download.suggestedFilename(); //pegar o nome sugerido, normalmente string aleatória
    const caminhoArquivo = 'download/' + nomeArquivoSugerido; // decidir um caminho de arquivo 
    await download.saveAs(caminhoArquivo); // salvar o arquivo no caminho do arquivo 

    //não é necessário salvar, pode só checar se o download deu certo
    expect(await download.failure()).toBeNull; // invocar a função failure() e se não houve falha, retorna não

    //import do fs pra usar p performar vários tipos de verificações 
    expect(fs.existsSync(caminhoArquivo)).toBeTruthy; //verificar se o arquivo existe dps do arquivo baixar 

    const tamanhoArquivoEmBytes = fs.statSync(caminhoArquivo).size; //verificar o tamanho do arquivo 
    console.log(tamanhoArquivoEmBytes);
    expect(tamanhoArquivoEmBytes).toBeLessThan(20_000); // verificando se não excede esse tamanho limite
});

test('Upload', async ({ page })=> 
{
    await page.goto('/loans.html');

    const uploadInput = page.locator('input[type="file"]'); //localizar o input, normalmente do type file 

    await uploadInput.setInputFiles('download/dummy.pdf'); //usar a função setInputFiles e passar o caminho do arquivo, começando do root do projeto
    
    //se quisermos passar multiplos arquivos 
    // await uploadInput.setInputFiles(['download/dummy.pdf', 'outro.file']); //passar num array
    
    // limpar um input 
    // await uploadInput.setInputFiles([]); //passar num array vazio

    // só clicar no submit dps (q não tem no projeto)
});