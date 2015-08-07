/* ---- novoAchievement ---- */
Template.novoAchievement.events({
    'submit #add-achievement': function(event) {
        var title = event.target.title.value;
        var pontuacao = event.target.pontuacao.value;
        var description = event.target.description.value;

        if(title && description && pontuacao){
            Achievements.insert({
                title : title,
                description : description,
                pontuacao : pontuacao
            });
            Router.go('/moderador/achievements/');
        }

        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    }
});

/* ---- editAchievement ----*/
Template.editAchievement.events({
    'submit #edit-achievement':function(event){
        var title = event.target.title.value;
        var description = event.target.description.value;
        var pontuacao = event.target.pontuacao.value;

        if(title && description && pontuacao){
            Achievements.update(Router.current().params._id,{
                $set:{
                    title:title,
                    description:description,
                    pontuacao:pontuacao
                }
            });
            Router.go('/moderador/achievements/');
        }

        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    },
    'click #delete-button': function(event){
        Achievements.remove(Router.current().params._id);
        Router.go('/moderador/noticias/');
    },
    'click #edit-button': function(event){
        Session.set('editar', true);
    },
    "submit #inserir_credenciado": function(event){
        var numero = event.target.credenciado.value;
        if(Credenciamentos.findOne(numero)){
            Achievements.update(Router.current().params._id,{
                $addToSet:{credenciados:numero}
            });
        }
        event.target.credenciado.value = "";
        return false;
    }
});

Template.editAchievement.helpers({
    achievement: function(){
        return Achievements.findOne(Router.current().params._id);
    },
    editar: function(){
        return Session.get('editar');
    },
});

/* ---- showAchievement ---- */
Template.showAchievement.helpers({
    achievement: function(){
        return Achievements.findOne(Router.current().params._id);
    },
    completou: function(achievement){
        var achievement = Achievements.findOne(Router.current().params._id);
        var cred = Credenciamentos.findOne( {user_id:Meteor.userId()} );
        return achievement.credenciados.indexOf(cred._id) != -1;
    },
    notificou: function(achievement){
        //var achievement = Achievements.findOne(Router.current().params._id);
        var cred = Credenciamentos.findOne( {user_id:Meteor.userId()} );
        return achievement.pedidos.indexOf(cred._id) != -1;
    },
    nao_credenciado: function(){
        return !(Credenciamentos.findOne( {user_id:Meteor.userId()} ));
    },
});

Template.showAchievement.events({
    "click #inscrever": function(event){
        Meteor.call("pedidoAchievement",Router.current().params._id);
    }
});


/* ---- ---- */
Template.Achievement.helpers({
    completou: function(achievement){
        var cred = Credenciamentos.findOne( {user_id:Meteor.userId()} );
        return achievement.credenciados.indexOf(cred._id) != -1;
    },
    notificou: function(achievement){
        var cred = Credenciamentos.findOne( {user_id:Meteor.userId()} );
        return achievement.pedidos.indexOf(cred._id) != -1;
    }
});

/* ---- ListaAchievements ---- */
Template.ListaAchievements.helpers({
    searched_achievements: function(){
        var search = Session.get('searchString') ;
        return Achievements.find({
            $or:[{'title':{$regex:search, $options:'i'}},
               {'description':{$regex:search, $options:'i'}},
            ]
        });
    }
});

Template.ListaAchievements.events({
    'keyup #search': function(event,t){
        Session.set("searchString",event.target.value);
    }
});



/* ---- userOnAchievements ---- */
Template.userOnAchievements.events({
    "click .toggle-checked": function (event) {
        var achievement = Achievements.findOne(Router.current().params._id);
        var credId = String(this);

        if(event.target.checked){
            Achievements.update(Router.current().params._id,{
                $addToSet:{credenciados:credId},
                $pull:{pedidos:credId}
            });
        }
        else{
            Achievements.update(Router.current().params._id,{
                    $pull:{credenciados:credId}
            });
        }
        Meteor.call('updatePontuacao',credId);
    }
});

Template.userOnAchievements.helpers({
    checked: function() {
        var listaFizeram = (Achievements.findOne(Router.current().params._id)).credenciados;
        var credId = this;
        /* Loop for, tentei usar for each mas o meteor nao aceitou...*/
        var tam = listaFizeram.length;
        for(var i = 0; i < tam ; i++){
            if(listaFizeram[i] == credId){
                return "checked";
            }
        }
        return false;
    },
    nome: function(credId){
        var user_id = (Credenciamentos.findOne(credId)).user_id;
        return (Meteor.users.findOne(user_id)).profile.nome;
    }
});
