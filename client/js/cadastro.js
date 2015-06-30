/*Mensagens de erro para o cadastro*/
var erroSistema = 'Ocorreu um erro no sistema, tente novamente mais tarde';
var erroEmail = 'Este email já está cadastrado. Talvez você queira reenviar seu <b><a id="verificar" href="#">email de confirmação</a></b> ou <a href="/recover-password"><b> recuperar sua senha </a></b>';
var erroVazio = 'Um ou mais campos do cadastro estão vazios';
var erroSenha = 'Senhas não batem';
var erroChecked = 'Você não pode criar uma conta se não concordar com nossos termos de uso';

Template.cadastro.events({
    "submit #formcadastro": function(event){
        var email = event.target.email.value;
        var password = event.target.password.value;
        var confirm_password = event.target.password2.value;
        var nome = event.target.nome.value;
        var cpf = event.target.cpf.value;
        var rg = event.target.rg.value;
        var tel = event.target.telefone.value;
        var uni = event.target.instituicao.value;
        var curso = event.target.curso.value;
        var terms_accepted = event.target.accepted.checked;
        var ra;

        if(password != confirm_password){
            Session.set('erro', erroSenha);
            return false;
        }

        if(event.target.ra){
            ra = event.target.ra.value;
        }else{
            ra = null;
        }

        if(!ra && uni == 'UNICAMP'){
            Session.set('erro', erroVazio);
            return false;
        }

        /* Verificar para não permitir campos nulos */
        if(!(email && password && nome && cpf && rg && tel && uni != "Universidade" && curso != "Curso")){
            Session.set('erro', erroVazio);
            return false;
        }

        console.log(terms_accepted);
        if(!terms_accepted){
            Session.set('erro', erroChecked);
            return false;
        }

        var user = {
            email: email,
            password: password,
            profile:{
                nome: nome,
                cpf: cpf,
                rg: rg,
                tel: tel,
                uni: uni,
                curso: curso,
                ra: ra
            }
        };

        /*Ele ta dando erro nessa porra, e mesmo com erro ele cria o usuario :P*/
        Accounts.createUser(user, function(Error){
            if(Error.message === 'Email already exists. [403]'){
                Session.set('erro', erroEmail);
            }else {
                Session.set('emailconfirmation', '1');
            }
        });

        return false;
    },
    /*Abrir o campo de RA*/
    "change .select-uni": function(event){
        Session.set('unicamper', event.target.value == "UNICAMP");
    },
    /*Para caso o usuario tenha digitado o mesmo email no cadastro*/
    "click #verificar": function(event){
        Session.set('emailconfirmation', '1');
    },
    /*Para reenvio do código para o email do usuario*/
    "submit #resendEmail": function(event){
        if(event.target.emailresendverification){
            var email = event.target.emailresendverification.value;
            if(Meteor.call('resendVerificationEmail', email)){
                console.log("Pedindo um novo reevio de email");
            }
        }
        Session.set('emailconfirmation', '1');
        return false;
    }
});

Template.cadastro.helpers({
    erroDeCadastro:function(){
        return Session.get('erro');
    },
    unicamper:function(){
        return Session.get('unicamper');
    },
    verificacaoEmail:function(){
        return Session.get('emailconfirmation');
    }
});
