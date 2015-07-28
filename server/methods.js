Meteor.methods({
    credenciaUser: function(userId,credId){
        if(!authAdmin(this.userId)) return;

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
                };
            Credenciamentos.insert(credenciamento);
        }
    },
    inscricaoAtividade: function(atividadeId){
        var atividade = Atividades.findOne(atividadeId);
        var cred = Credenciamentos.findOne({user_id:this.userId});

        if(atividade.inscritos == null){
            Atividades.update(atividadeId,{$set:{inscritos:[]}});
            atividade.inscritos = [];
        }
        if(atividade.requires_inscricao &&
            atividade.inscritos.length < atividade.num_max_inscritos
            && Atividades.find({inscritos:cred._id}).count() < Settings.num_max_inscricoes){

                Atividades.update(atividadeId,
                        {$addToSet:{inscritos:cred._id}});
                return true;
            }
        return false;
    },
    pedidoAchievement: function(achievementId){
        var achievement = Achievements.findOne(achievementId);
        var credId = (Credenciamentos.findOne({user_id:this.userId}))._id;

        Achievements.update(achievement,{
            $addToSet:{pedidos:credId}
        });
    },
    updatePontuacao: function(credId){
        var pontos = 0;
        Atividades.find({'feedback.credId':credId}).forEach(function(obj){
            pontos += obj.pontuacao;
        });
        Achievements.find({credenciados:credId}).forEach(function(obj){
            pontos += obj.pontuacao;
        });
        console.log(pontos);
        Credenciamentos.update(credId,{$set:{pontos:pontos}});
    },
    submitFeedback: function(atividadeId,surveyItems){
        var atividade = Atividades.findOne(atividadeId);
        if(Object.keys(surveyItems).length != Perguntas.find({modelos:atividade.modelo}).count()){
            return;
        }

        var surveyItems = Object.keys(surveyItems).map(function(key){
            return {pergunta:key,resposta: Number(surveyItems[key])}
        });

        var questionario = { 
            credId: Credenciamentos.findOne({user_id:this.userId})._id,
            items: surveyItems
        }

        if(atividade.presentes.indexOf(questionario.credId) == -1){
            return;
        }

        if(Atividades.find({'feedback.credId':this.userId}).count() == 0){
            Atividades.update(atividadeId, 
                    {$addToSet:{feedback:questionario}});
        }
        Meteor.call('updatePontuacao',questionario.credId);
    }
});
