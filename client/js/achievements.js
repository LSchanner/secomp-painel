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
    }
});

Template.editAchievement.helpers({
    achievement: function(){
        return Achievements.findOne(Router.current().params._id);
    }
});

/* ---- showAchievement ---- */
Template.showAchievement.helpers({
    achievement: function(){
        return Achievements.findOne(Router.current().params._id);
    }
});

/* ---- Achievement (for showing each achievement) ---- */
Template.Achievement.helpers({
    encurta: function(body){
        return $(body).text().substring(0,200) + ' ...';
    }
});

/* ---- ListaAchievements ---- */
Template.ListaAchievements.helpers({
    achievements: function(){
        return Achievements.find({},{limit:Session.get('pag') * 10});
    },
    temMais: function() {
        return Achievements.find().count() > Session.get('pag') * 10;
    }
});

Template.ListaAchievements.events({
    'click #tem-mais':function(event){
        Session.set('pag',Session.get('pag') + 1);
    }
});

Template.ListaAchievements.onRendered(function(){
   Session.set('pag',1);
});
