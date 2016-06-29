var texto_email_pagamento = function(code){
    return "Obrigador por se inscrever para a Secomp! <br> Para confirmar sua inscrição e poder se credenciar e participar das atividades durante a semana, realize o pagamento <a href='https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code + "'>clicando aqui.</a>"

}

/* ------------- VERIFICACAO DE EMAIL -------------- */
Meteor.methods({
    /*Método para reenviar o email de verificação*/
    resendVerificationEmail:function(requestEmail){
        var user = Meteor.users.findOne( {'emails.address' : requestEmail} );
        console.log("Mandando email de verificação ao usuario " + user.profile.nome);

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

        console.log("Novo usuário " + user.profile.nome + " cadatrado vficação ");

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
    if(!(Settings.inscricoes_abertas)){
        return null;
    }
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
