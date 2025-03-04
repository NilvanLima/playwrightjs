import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  //nivel de suite de testes
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  workers: 2,
  retries: 2, //quantas o test runner vai tentar reproduzir o teste de novo se falhar 
  maxFailures: 5, // num máximo de falhas de teste aceitas, útil para saídas de builds quebradas anterior p investigação ser mais ágil

  //propriedades aninhadas = tipicamente afetam o comportamento de testes individuais, não o test suit inteiro
  expect: 
  {
    timeout: 3000,
    //snapshots, etc 
  },

  use: 
  {
    timezoneId: 'Africa/Lagos', //vai ser aplicado para todos os testes, exceto aqueles q fazem override disso
    baseURL: 'http://localhost:3000/',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {slowMo: 100}
    //cada teste vai abrir no browser e vai ter um delay de 1 seg
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm  start',
    url: 'http://localhost:3000/',
    reuseExistingServer: !process.env.CI,
    // port ( se quiser )
  },

  projects: 
  [
    {
      //projeto 1 + propriedades criticas 
      name: 'chromium', //metadados, ler e entender sobre oq é o projeto
      use: { ...devices['Desktop Chromium']}, //importar devices ***
    },

    {
      //projeto 2
      name: 'firefox',
      use: { ...devices['Desktop Firefox']}
    },

    {
      //projeto 3
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12']},
      testDir: './tests/mobile'
    },

    {
      //por proposito
      name: 'Smoke Test Suite',
      testMatch: /.*smoke.test.ts/, //regex = rodar apenas testes que contem 'smoke' substring neles
      retries: 0
    },

    {
      name: 'Regular Test Suite',
      testIgnore: /.*smoke.test.ts/, //ignora os smoke tests mas roda todo o resto
      retries: 2,
      use: 
      {
        // ...
      },
    },

    {
      //setup global, primeiro isso
      name: 'setup-cleanup-demo',
      testMatch: '_4config_global.test.ts',
      dependencies: ['setup', 'admin-auth', 'popular-db'], //propriedade dependencies, declarar 1 ou mais projetos usados como setup
      teardown: 'cleanup'
    },

    {
      //projeto de cleanup global
      name: 'cleanup',
      testMatch: '**/global.teardown.ts'
    },

    //segundo vem:
    {
      name: 'setup',
      testMatch: '**/global.setup.ts',
      teardown: 'cleanup'
    },

    {
      name: 'admin-auth',
      testMatch: '**/admin-auth.setup.ts'
    },

    {
      name: 'popular-db',
      testMatch: '**/popular-db.setup.ts'
    }
  ],
});
