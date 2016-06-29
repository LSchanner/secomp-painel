/* ----- Configuração email ---- */

/*Configuração Servidor SMTP */
Meteor.startup(function () {
    smtp = {
        username: '@gmail.com',   // email
        password: '',
        server:   'smtp.gmail.com',  // mail.server.com
        port: 465 // ex.25 ou 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

/*Configuração envio de Modelos*/
Meteor.startup(function() {
    //Colocar o nome que deve aparecer no email (ex. Secomper <do-not-reply@secomp.com.br>)
    Accounts.emailTemplates.from = 'Secomp Unicamp <no-reply@secomp.com.br>';
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
        return 'Este email foi cadastrado no sistema da secomp\nClique no link abaixo para confirmar o email e começar a usa-lo:\n\n' + url;
    };
    /* -- Templates para resetPassword -- */
    //Definir o Subject do Email
    Accounts.emailTemplates.resetPassword.subject = function(user) {
        return 'Recuperação de Senha do sistema da SECOMP';
    };
    Accounts.emailTemplates.resetPassword.text = function(user, url) {
        return 'Você pediu para recuperar sua senha.\n Clique no link abaixo para redefinir sua senha:\n\n ' + url + '\n\n';
    };

});
