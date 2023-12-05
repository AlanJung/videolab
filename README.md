
Projeto Node.js com PostgreSQL e Flyway

Este é um projeto simples em Node.js que utiliza PostgreSQL como banco de dados e Flyway para gerenciar as migrações do banco de dados. O frontend é construído com Express e pode ser executado localmente.

Pré-requisitos
Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Se preferir, também pode instalar o PostgreSQL localmente.

Docker
Docker Compose ou PostgreSQL instalado localmente.
Configuração do Banco de Dados
Usando Docker Compose (recomendado)
Execute o seguinte comando para iniciar o PostgreSQL usando Docker Compose:

docker-compose up -d

Isso iniciará um contêiner PostgreSQL em segundo plano.

Instalando o PostgreSQL localmente (opcional)
Se você preferir, pode instalar o PostgreSQL localmente. Certifique-se de configurar as credenciais corretas e atualize o arquivo de configuração no código, se necessário.

Executando Migrações com Flyway
Certifique-se de ter o Flyway instalado em sua máquina.

No terminal, navegue até o diretório do projeto e execute o seguinte comando para aplicar as migrações:

flyway migrate

Isso aplicará as migrações definidas no diretório /migrations para o banco de dados.

Executando o Backend
No terminal, navegue até o diretório do projeto e execute o seguinte comando para iniciar o backend:

npm run start
Isso iniciará o servidor Express.

Executando o Frontend
Navegue até o diretório /frontend e execute o seguinte comando para iniciar o frontend:

npm run dev
Agora você pode acessar o aplicativo no seu localhost
