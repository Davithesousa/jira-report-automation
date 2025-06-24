



Este repositório contém o código para compilar uma **Extensão para Web Browsers baseado em Chromium**, com a capacidade de gerar um template padronizado de forma mais eficiente no Jira


    1. A ferramenta foi projetada para mitigar erros humanos, reduzir o tempo de registro, e garantir que todas 
    as informações necessárias para que o reporte de issues sejam compiladas de forma precisa e organizada de acordo com o padrão do projeto.

    2. Tambem tem o objetivo de facilitar o processo de reporte pois pode ser integrada 
    com as diferentes plataformas de gerenciamento como o Jira (Zephyr).

    3. Além disso tem um atalho para gerar a issue via API (Jira) automaticamente no momento de gerar o template.

## Pre-requisitos

- **Node Js**
- **Web Browser** (Chrome ou Edge)

## Compilando a extensão

1. Clonar o projeto
    
    ```bash
    git clone 
    cd jira-report
    ```
2. Entrar na pasta TempLite_react e executar o comando "npm run install"
    
    ```bash
    cd Jira-report-react
    cd npm run install
    ```
    
3. Gerar User Token no Jira
    
    

4. Adicionar User Token no arquivo config.json localizado na pasta "jira-report\TempLite_react\src\assets"

5. Executar o comando "npm run build"
    ```bash
    npm run build
    ```
6. Serão gerados 2 arquivos na pasta "jira-report\TempLite_react\dist\assets"

7. Renomear os arquivos gerados .css para index.css e o arquivo .js para index-modal.js

8. Colocar os dois arquivos renomeados na pasta \jira-report\Extension
    

## Adicionando a extensão no Navegador (Chrome, Edge, etc.)

    1. Abrir o Navegador baseado no Crhomium
    2. Ir até Extensões e Gerenciar extensões
    3. Ativar o modo desenvolvedor
    4. Adicionar a extensão fazendo click encima da opção carregar sem compactação
    5. Selecionar a pasta \jira-report\Extension e continuar
    

