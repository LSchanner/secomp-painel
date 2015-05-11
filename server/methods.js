Meteor.methods({
    credenciaUser: function(userId,credId){
        if(Credenciamentos.findOne({$or:[{user_id: userId},{_id:credId}]})){
            return false;
        }
        else{
            var credenciamento = {
                    user_id: userId ,
                    _id: credId,
                    pontos: 0,
                    atividades:[],
                    achievements:[],
                    compras:[],
                }
            Credenciamentos.insert(credenciamento);
        }
    }
});
