/*Javascript for login page*/

/*Textos para erros*/
var sucesso = 'Obrigado por completar seu cadastro!\nAgora voce já pode fazer login.';
var quebrado = 'Desculpe, link de verificacao expirado';

/*Eventos*/
Template.login.events({
    "submit #loginform": function(event){
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(Error){
            if(Error){
                Session.set('erroLogin',true)
            }
            else {
                Router.go('/');
            }
        });

        return false;
    }
});

/*Helpers*/
Template.login.helpers({
    erro:function(){
        return Session.get('erroLogin');
    },
    confirmation:function(){
        return Session.get('verification');
    }
});


/* Verificacao de tokens */
Template.login.created = function() {
    if (Accounts._verifyEmailToken) {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
            if (err != null) {
                if (err.message = 'Verify email link expired [403]') {
                    Session.set('verification', quebrado);
                }
            } else {
                Session.set('verification', sucesso);
            }
        });
    }
};
