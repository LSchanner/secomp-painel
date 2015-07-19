Meteor.methods({
    confirmaPagamento: function(code){
        this.unblock();
        try{
            var result = HTTP.get('https://ws.pagseguro.uol.com.br/v2/transactions/' + code,   
                {
                    params:{
                        email:'contato@secomp.com.br',
                        token: process.env.TOKEN_PAGSEGURO
                    }
                }
                );
        }catch(e){
            console.log(e);
            return false;
        }

        var xml = result.content;
        var status = xml.substr(xml.indexOf('<status>')+8,xml.indexOf('</status>'));
        console.log(xml);
        console.log(status);
        return (status == '3');

    }
})

Router.route('/pagseguro/notify',function(){
    var req = this.request;
    if(req.Host == 'pagseguro.uol.com.br'){
        var code = req.body.notificationCode;
        console.log(code);
        HTTP.get('https://ws.pagseguro.uol.com.br/v3/transactions/notifications/' + code,
            {
                params:{
                        email:'contato@secomp.com.br',
                        token: process.env.TOKEN_PAGSEGURO
                }
            },
            function(error,result){
                if(erro){
                    console.log("ERRO PAGSEGURO NOTIFICAÇÔES");
                }
                var xml = result.content;
                var status = xml.substr(xml.indexOf('<status>')+8,xml.indexOf('</status>'));
                var userId = xml.substr(xml.indexOf('<reference>')+11,xml.indexOf('</reference>'));
                if(status == 3){
                    Meteor.users.update(userId,{$set:{pago:true}});
                }
            }
            );
    }
    
},{where:'server'});
