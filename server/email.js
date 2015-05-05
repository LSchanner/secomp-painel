/* ----- Configuração email ---- */
/*Configuração Servidor SMTP */
Meteor.startup(function () {
    smtp = {
      username: 'henrique.facioli@gmail.com',   // ex. server@gentlenode.com
        password: 'owxljmymvtgglvia',   // ex. 3eeP1gtizk5eziohfervU
        server:   'smtp.gmail.com',  // ex. mail.gandi.net
        port: 465 // ex.25 ou 465
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

/*Configuração envio de Modelos*/
Meteor.startup(function() {
    //Colocar o nome que deve aparecer no email (ex. Secomper <do-not-reply@secomp.com.br>)
    Accounts.emailTemplates.from = 'henriquetestes <henrique.facioli@gmail.com>';
    //
    Accounts.emailTemplates.siteName = 'Secomp';
    // A Function that takes a user object and returns a String for the subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirme seu endereço de email para a SECOMP';
    };
    // A Function that takes a user object and a url, and returns the body text for the email.
    // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'Clique no link confirmar o email:\n' + url;
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
    //Por hora, caso o usuario tente fazer login sem ter verificado, enviamos um novo email a ele
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        console.log('Email não verificado');
        Accounts.sendVerificationEmail(user._id);
        console.log('Enviando outro email...');

        return true; // Por enquanto que não esta funcional deixar true
    }
    return true;
});

/* -------- RESET PASSWORD -----------*/
