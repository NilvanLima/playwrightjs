import { test as setup} from '@playwright/test';

setup.use({ });

setup('Popular o banco de dados', async ({ page }) => 
{
    console.log('Popular o DB');
});