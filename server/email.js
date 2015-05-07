/* ----- Configuração email ---- */
/*Configuração Servidor SMTP */
Meteor.startup(function () {
    smtp = {
      username: 'secomp12345@gmail.com',   // ex. server@gentlenode.com
        password: 'secomp2015',
        server:   'smtp.gmail.com',  // ex. mail.gandi.net
        port: 465 // ex.25 ou 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

/*Configuração envio de Modelos*/
Meteor.startup(function() {
    //Colocar o nome que deve aparecer no email (ex. Secomper <do-not-reply@secomp.com.br>)
    Accounts.emailTemplates.from = 'Secomp helper <secomp12345@gmail.com>';
    //O site do envio
    Accounts.emailTemplates.siteName = 'secomp.com.br';

    /* -- Templates para verifyEmail -- */
    //Definir o Subject do Email
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirme seu endereço de email para a SECOMP';
    };
    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Clique no link confirmar o email:\n' + url;
    };

    /* -- Templates para resetPassword -- */
    //Definir o Subject do Email
    Accounts.emailTemplates.resetPassword.subject = function(user) {
        return 'Recuperação de endereço de email da SECOMP';
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url) {
        return 'Você pediu para resetar sua senha. Clique no link abaixo para redefinir sua senha:\n\n' + url + '\n\n';
    };

});


/* --------- VERIFICACAO DE EMAIL ---------- */
/* Para enviar a verificação de email */
Accounts.onCreateUser(function(options, user) {
    user.profile = {};

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
});

/*Verificacao de usuario checked com o email*/
Accounts.validateLoginAttempt(function(attempt){
    //Verifica se o usuario ja confirmou o email
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        console.log('Email não verificado ao tentar fazer login');
        return false;
    }
    return true;
});

/* -------- RESET PASSWORD -----------*/
