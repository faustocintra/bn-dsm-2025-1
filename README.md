# Forkando e clonando este repositório

**OBS.: este procedimento é IMPRESCINDÍVEL para que, posteriormente, o aluno possa entregar o Trabalho 1 da disciplina.**

1. Faça _login_ no [GitHub](https://github.com).
2. Acesse [https://github.com/faustocintra/bn-dsm-2025-1](https://github.com/faustocintra/bn-dsm-2025-1).
3. Clique sobre o botão `[Fork]` no canto superior direito.
4. Na página seguinte ("Create new fork"), não altere nada, simplesmente clique sobre o botão `[Create fork]`. Aguarde.
5. Confira se a URL mostrada no navegador corresponde a "https://github.com/**<SEU USUÁRIO>**/bn-dsm-2025-1".
6. Clique sobre o botão verde `[Code]` e copie o endereço do seu repositório forkado.
7. Abra o Visual Studio Code. Se houver algum projeto aberto, feche-o usando a opção de menu `Arquivo > Fechar Pasta` (ou `File > Close folder`).
8. Clique sobre o botão que se parece com um `Y` na barra vertical esquerda do Visual Studio Code. Em seguida, clique sobre o botão `[Clonar repositório...]` (ou `[Clone repository...]`). Nessa etapa, se o Git não estiver instalado na máquina, será necessário baixá-lo (a partir de [https://git-scm.com/](https://git-scm.com/)) e instalá-lo antes de poder clonar o repositório.
9. Na caixa de diálogo que se abre no alto da janela, cole o endereço do repositório copiado no passo 6.
10. Escolha um pasta local do computador para armazenar os arquivos do repositório clonado.
11. Ao ser perguntado se deseja abrir o repositório clonado, clique sobre o botão `[Abrir]`.

# Criando um projeto Express

Siga as instruções [deste artigo](https://faustocintra.com.br/desenvolvimento-back-end/criando-um-projeto-express-js-em-2024/).

# Alternando para a pasta do projeto back-end

No terminal:
`cd back-end`

# Executando o projeto back-end

No terminal, na pasta `back-end`:
`npm run dev`

# Instalando a biblioteca Prisma

No terminal, na pasta `back-end`:

`npm install prisma --save-dev`

# Inicialização do Prisma

No terminal, na pasta `back-end`:

`npx prisma init --datasource-provider mongodb`

# URI para conexão ao MongoDB local (com _replica set_ habilitado)

`mongodb://127.0.0.1:27017/loja?directConnection=true`

# (Re)criação do Prisma Client

Toda vez que o arquivo `schema.prisma` é modificado, é necessário executar o seguinte comando no terminal, na pasta `back-end`:

`npx prisma generate`
