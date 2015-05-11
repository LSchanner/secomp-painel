Template.forgotPassword.events({
    "submit #forgotPasswordForm": function(event){
        if(event.target.email){
            var email = event.target.email.value;
            Meteor.call('sendResetPassword', email);
            Session.set('envio', true);
        }
        return false;
    }
});

Template.forgotPassword.helpers({
    sucesso:function(){
        return Session.get('envio');
    },
});

/* --------- RESET PASSWORD ---------- */
var doneCallback;
//Funcao chamada quando acessam o link de verificacao
Accounts.onResetPasswordLink(function (token, done) {
    Router.go('/reset-password');
    Session.set('resetPassword', token);
    Session.set('alert', null);
    doneCallback = done;
});

Template.ResetPassword.events({
    //Funcao para mudanca de senha
    'submit #reset-password-form': function(event) {
        if(event.target.password && event.target.password2){
            var new_password = event.target.password.value;
            var confirm_password = event.target.password2.value;

            if(new_password != confirm_password){
                Session.set('alert', 'Senhas não batem');
                return false;
            }

            Accounts.resetPassword(Session.get('resetPassword'), new_password, function(Error) {
                if (Error) {
                    if (Error.message === 'Token expired [403]') {
                        Session.set('alert', 'Link expirado');
                    } else {
                        Session.set('alert', 'Houve algum problema inexperado. Contacte a organizacao');
                    }
                } else {
                    Session.set('alert', 'Senha modiicada, <a href="/"> Clique aqui para voltar</a>');
                    Session.set('resetPasswordToken', false);
                    // Call done before navigating away from here
                    if (doneCallback) {
                        doneCallback();
                    }
                    Router.go('/');
                }
            });
        }
        return false;
    }
});


Template.ResetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    },
    mudanca: function(){
        return Session.get('alert');
    }
});
