

Template.cadastro.events({
    "submit #formcadastro": function(event){
        var email = event.target.email.value;
        var nome = event.target.nome.value;
        var password = event.target.password.value;

        var user = {
            email: email,
            password: password,
            profile:{
                pontos: 0,
                nome: nome
            }
        }

        Accounts.createUser(user,function(Error){
            if(Error){
                console.log(Error)
                Session.set('erroCadastro',true)
            }
            else {
                Meteor.loginWithPassword(email,password);
                Router.go('/');
            }
        }); 

        return false;
    }
});
Template.cadastro.helpers({
    erro:function(){
        return Session.get('erroCadastro');
    }
});
