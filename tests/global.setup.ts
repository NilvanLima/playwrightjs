import { test as setup} from '@playwright/test';
//dá pra renomear quando é importado, oq deixa o código semanticamente significativo

setup.use({});

setup('Fazer o setup', async ({ page }) => 
{
    console.log('Setup');
    //injetar autenticação, popular um db com dados de teste, etc...
    //podemos usar page fixtures, e até a função .use()
});
