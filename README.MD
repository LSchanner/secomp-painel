#Secomp Painel
este é o sistema de gerenciamento da semana de computação da unicamp

# Instalando

Mude o arquivo server/email para um email válido com sua senha e servidor
    username: 'yy@xx',
    password: 'xyz',
    server:   'lal.lal.com',
    port:     '25'

Rode o comando meteor run
cadastre seu usuário e confirme seu email

## Criando sua conta a partir de um arquivo
crie um arquivo chamado fixture em server/fixture.js
e coloque o código a abaixo nela


    if ( Meteor.users.find().count() === 0 ) {
        /* Criação de um usuário x não admin */
        Accounts.createUser({
            username: 'USERNAME',
            email: 'EMAIL',
            password: 'PASSWORD',
            profile:{
                nome: 'NOME'
            }
            });

            /* Criação do admin */
            var id = Accounts.createUser({
                username: 'admin',
                email: 'admin@secomp.com',
                password: 'admin',
                profile:{
                    nome: 'admin'
                }

            });
        Meteor.users.update({_id:id},{$set:{admin:true}});
    }

## Como entrar como admin
Para tornar seu usuário admin, assegure- de que ele será o primeiro a entrar no servidor:3000/admin
agora você poderá editar o banco de dados a partir de uma interface web
