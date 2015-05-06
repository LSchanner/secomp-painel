/*Mensagens de erro para o cadastro*/
var erroEmail = 'Este email já está cadastrado. Talvez você queira <a href="/login/recuperarsenha"><b> recuperar sua senha </a></b>'
var erroVazio = 'Um ou mais campos do cadastro estão vazios'

Template.cadastro.events({
    "submit #formcadastro": function(event){
        var email = event.target.email.value;
        var password = event.target.password.value;
        var nome = event.target.nome.value;
        var cpf = event.target.cpf.value;
        var rg = event.target.rg.value;
        var tel = event.target.telefone.value;
        var uni = event.target.instituicao.value;
        var curso = event.target.curso.value;

        if(event.target.ra){
            var ra = event.target.ra.value;
        }
        else{
            var ra = null;
        }

        /* Verificar para não permitir campos nulos */
        if(!(email && password && nome && cpf && rg && tel && uni != "Universidade" && curso != "Curso")){
            Session.set('erro', erroVazio);
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
        }

        Accounts.createUser(user, function(Error){
            if(Error){
                Session.set('erro', erroEmail);
            }
            else {
                Meteor.loginWithPassword(email,password);
                Router.go('/');
            }
        });

        return false;
    },
    "change .select-uni": function(event){
        Session.set('unicamper', event.target.value == "UNICAMP");
    }
});

Template.cadastro.helpers({
    erroDeCadastro:function(){
        return Session.get('erro');
    },
    unicamper:function(){
        return Session.get('unicamper');
    }
});
