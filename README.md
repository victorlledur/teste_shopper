Aplicação criada para o teste tecnico da Shopper, para a vaga de Fullstack Developer.

Este é um passp a passo de como instalar executar esta aplicação de forma local.

Primeiramente baixe o conteudo deste repositorio para a sua máquina.

Abra a pasta no VSCode ou em seu editor de codigos preferido.

Abra o terminal e execute o comando "npm install" para instalar todas as dependencias necessárias.

Esse progeto usa como ORM o Prisma, então execute o comando "npx prisma generate" mara gerar os artefatos do Prisma na sua pasta node_modules.

Crie um arquivo .env e nele defina a URL do banco de dados e a porta a ser usada da seguinte forma:
DATABASE_URL="mysql://usuariodomysql:senha@localhost:3306/nomedoseuschema
PORT=3001

Caso sua senha contenha cacteres especiais voce precisa encodar esse cactere por exemplo "senha=teste#". Ela devera ficar assim na URL: "senha=teste%23"

Assim temos o ambiente de desenvolvimento configurado. Execute o comando "npm run dev" e se tudo foi configurado da maneira correta, o backend estara funcionado, e disponivel para requisições!

Acesse o repositorio do frontend desse projeto, para dar seguimento a esse passo a passo nesse link : (https://github.com/victorlledur/teste_shopper_front)