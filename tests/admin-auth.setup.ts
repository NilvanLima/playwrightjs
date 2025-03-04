import { test as setup} from '@playwright/test';

setup.use({ });

setup('Autenticar como ADM', async ({ page }) => 
{
    console.log('Fazer a autenticação como Admin');
});