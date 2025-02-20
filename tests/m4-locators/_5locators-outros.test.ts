import { test } from "@playwright/test";

test("Fill test", async({ page }) => 
{
    await page.goto('/');

    //jeito 1, usando o page object chamando as ações diretamente e passando um locator
    await page.check('#heard-about'); //passando um checkbox e procurando ele usando o id
    await page.check('#heard-about'); //ID duplicado do locator ou extrair as string locators para consts globais e isso não é legal...

    //jeito 2, ação > locator e passando o texto
    //a principio esse é melhor, curto e simples
    //era o jeito sugerido pelo PW
    //tem desvantagens: 
        // 1- essas ações retornam uma promise vazia Promise<void>, ou seja, retornam nada, n retornam locator, locators não existem como conceito de um evento while
            // 1.2- se quisessemos clicar 2 vezes, teriamos que duplicar a string do locator
        // 2- comportamento de antes de um locator achar vários elementos e só funcionar no primeiro
    await page.fill('#textarea', 'Peteca...');
});
