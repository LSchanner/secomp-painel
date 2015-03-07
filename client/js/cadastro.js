

Template.cadastro.events({
    "submit #formcadastro": function(event){
        var email = event.target.email.value;
        var nome = event.target.nome.value;
        var password = event.target.password.value;

        if(event.target.ra){
            var documento = "ra " + event.target.ra.value;
        }
        else{
            var documento = "cpf " + event.target.cpf.value;
        }

        var user = {
            email: email,
            password: password,
            profile:{
                documento: documento,
                nome: nome,
            }
        }

        Accounts.createUser(user,function(Error){
            if(Error){
                console.log(Error);
                Session.set('erroCadastro',true);
            }
            else {
                Meteor.loginWithPassword(email,password);
                Router.go('/');
            }
        }); 

        return false;
    },
    "click #unicamper": function(event){
        Session.set('unicamper', !Session.get('unicamper'));
    }
});

Template.cadastro.helpers({
    erro:function(){
        return Session.get('erroCadastro');
    },
    unicamper:function(){
        return Session.get('unicamper');
    }
});
