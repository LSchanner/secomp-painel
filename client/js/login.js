/*Javascript for login page*/

/*Textos para erros*/
var sucesso = 'Obrigado por completar seu cadastro! Agora voce já pode fazer login.';
var quebrado = 'Link de verificacao expirado.';
var naoVerificado = 'Usuário ainda não verificado. Reenviando email de verificação';
var naoCadastrado = 'Usuário não encontrado ou senha incorreta';

/*Eventos*/
Template.login.events({
    "submit #loginform": function(event){
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(Error){
            if(Error){
                if(Error.message == 'Login forbidden [403]'){
                    Session.set('erroLogin',naoVerificado)
                    Router.go('/cadastro');
                    Session.set('emailconfirmation','1');
                }else{
                    Session.set('erroLogin',naoCadastrado)
                }
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
    confirmationSucess:function(){
        return Session.get('sucess');
    },
    confirmationFail:function(){
        return Session.get('fails');
    },
    resetPasswordToken: function() {
        return Session.get('resetPasswordToken');
    }
});


/* Verificacao de tokens */
Template.login.onCreated(function() {
    if (Accounts._verifyEmailToken) {
        Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
            if (err != null) {
                if (err.message == 'Verify email link expired [403]') {
                    Session.set('fails', quebrado);
                }
            } else {
                Session.set('sucess', sucesso);
            }
        });
    }
});
