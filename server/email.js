var texto_email_pagamento = function(code){
    return "Obrigador por se inscrever para a Secomp! <br> Para confirmar sua inscrição e poder se credenciar e participar das atividades durante a semana, realize o pagamento <a href='https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code + "'>clicando aqui.</a>" 

}
/* ----- Configuração email ---- */
/*Configuração Servidor SMTP */
Meteor.startup(function () {

    // No momento usamos o Servidor de SMTP do IC. TODO Migrar para algo mais profissa.
    smtp = {
      username: 'postmaster@mg.secomp.com.br',   // 
        password: process.env.MAIL_PASSWORD,
        server:   'smtp.mailgun.org',  // ex. mail.gandi.net
        port: 587 // ex.25 ou 465
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


/* ------------- VERIFICACAO DE EMAIL -------------- */
Meteor.methods({
    /*Método para reenviar o email de verificação*/
    resendVerificationEmail:function(requestEmail){
        var user = Meteor.users.findOne( {'emails.address' : requestEmail} );
        console.log("Mandando email de verificação ao usuario");

        if(user){
            if(!user.emails[0].verified){
                Accounts.sendVerificationEmail(user._id);
                return true;
            }
        }
        return false;

    },
    /*Método para enviar o token de resetar email*/
    sendResetPassword:function(requestEmail){
        var user = Meteor.users.findOne( {'emails.address' : requestEmail} );

        if(user){
            if(user.emails[0].verified){
                Accounts.sendResetPasswordEmail(user._id);
                return true;
            }
        }
        return false;
    }
});

/* Para enviar a verificação de email */
Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile;

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
        console.log("Mandando email de verificação ao usuario");

        // Cobrança
        if(user.profile.uni != "UNICAMP" || (user.profile.curso != "EC"
                && user.profile.curso != "CC")){

            // Chamada HTTP para API do PagSeguro
            HTTP.call("POST",
                "https://ws.pagseguro.uol.com.br/v2/checkout",
                {
                    params:{
                        email:"contato@secomp.com.br",
                        token:process.env.TOKEN_PAGSEGURO,
                        currency:"BRL",
                        itemId1:"01",
                        itemDescription1:"Secomp Unicamp",
                        itemAmount1:"35.00",
                        itemQuantity1:"1",
                        reference: user._id,
                        senderEmail: options.email,
                        senderName: user.profile.nome
                    },
                    headers:{
                        'Content-Type':"application/x-www-form-urlencoded; charset=ISO-8859-1"
                    }
                },function(error,result){
                    if(error){
                        console.log("ERRO PAGSEGURO");
                        console.log(error);
                    }
                    var xml = result.content;
                    var code = xml.substring(6 + xml.indexOf('<code>'),xml.indexOf('</code>'));
                    Meteor.users.update(user._id,{$set:{codePagSeguro:code,pago:false}});
                    Email.send({
                        from:'Secomp Unicamp <no-reply@secomp.com.br>',
                        to:options.email,
                        subject:"Pagamento da Taxa de inscrição",
                        html:texto_email_pagamento(code)
                    });
                }
            );

        }
    }, 2 * 1000);

    return user;
});

/*Verificacao de usuario checked com o email*/
Accounts.validateLoginAttempt(function(attempt){
    //Verifica se o usuario ja confirmou o email
    if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
        console.log('Email não verificado tentando fazer login');
        return false;
    }
    return true;
});
