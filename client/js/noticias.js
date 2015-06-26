Session.setDefault('pag',1);

// Página de listagem de noticias
Template.Noticias.helpers({
    noticias: function() {
        return Noticias.find({},{sort:{created:-1},limit:Session.get('pag') * 10})
    },
    temMais: function() {
        return Noticias.find().count() > Session.get('pag') * 10;
    }
});
Template.Noticias.events({
    'click #tem-mais': function(){
        Session.set('pag',Session.get('pag') + 1);
    }
});

// Template de uma Noticia encurtada
Template.Noticia.helpers({
    encurta: function(body){
        return $(body).filter('p:first').html();
    },
    format: function(date) {
        return moment(date).format('LLL');
    }
});


Template.novaNoticia.events({
    'submit #add-noticia': function(event) {
        var title = event.target.title.value;
        var body = event.target.body.value;

        if(title && body){
            Noticias.insert({title:title, body:body, created:new Date});
            Router.go('/moderador/noticias/');
        }
        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    }
});


Template.editNoticia.helpers({
    noticia: function(){
        return Noticias.findOne(Router.current().params._id);
    }
});

Template.editNoticia.events({
    'submit #edit-noticia': function(event) {
        var title = event.target.title.value;
        var body = event.target.body.value;

        if(title && body){
            Noticias.update(Router.current().params._id,
                {$set:{title:title, body:body}}
                );
            Router.go('/moderador/noticias/');
        }
        else{
            alert('Por favor preencha todos os campos');
        }
        return false;
    },
    'click #delete-button': function(event) {
        Noticias.remove(Router.current().params._id);
        Router.go('/moderador/noticias/');
    }

});

// página de visualizar notícia
Template.shownoticia.helpers({
    noticia: function(){
        return Noticias.findOne(Router.current().params._id);
    },
    format: function(date) {
        return moment(date).format('LLL');
    }
});

