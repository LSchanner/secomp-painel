#Secomp Painel
este é o sistema de gerenciamento da semana de computação da unicamp

## Instalando
Mude o arquivo server/email-configuration.js para um email válido com sua senha e servidor

    smtp = {
        username: '@gmail.com',   // email
        password: '',
        server:   'smtp.gmail.com',  // mail.server.com
        port: 465 // ex.25 ou 465
    }


Rode o comando `meteor run`
já deve ser possível acessar ao painel atravez de [http://localhost:3000](http://localhost:3000)

## Criando sua conta a partir de um arquivo
(Este método não é o mais seguro e deve ser evitado, já que mantem a senha em plain text, use somente para teste)

crie um arquivo chamado `fixtures.js` em `server/fixtures.js`
e coloque o código a abaixo nela, substituindo as letras maiusculas do jeito que desejar.


    if ( Meteor.users.find().count() === 0 ) {
        /* Criação de um usuário x não admin */
        Accounts.createUser({
            username: 'USERNAME',
            email: 'henrique.facioli@gmail.com',
            password: 'admin',
            profile:{
                nome: 'nome',
                cpf: 'cpf',
                rg: 'rg',
                tel: 'tel',
                uni: 'UNICAMP',
                curso: 'EC',
                ra: '111111',
                formatura: '2020'
            }
        });
    }


## Criando conta a partir do sistema
Para criar sua conta é só seguir pelo sistema, usando o cadastramento de contas como normal, para se tornar admin, leita Como entrar como admin

## Como entrar como admin
Para tornar seu usuário admin, assegure- de que ele será o primeiro a entrar no servidor:3000/admin
agora você poderá editar o banco de dados a partir de uma interface web
