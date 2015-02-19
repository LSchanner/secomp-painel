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
        return $(body).filter('p:first').text();
    },
    format: function(date) {
        return moment(date).format('LLL');
    }
});


// Página de adicionar notícia
Router.route('/admin/noticias/nova/', function () {
    this.layout('painelAdmin');
    this.render('novaNoticia');
},{ name:'novaNoticia',
    onBeforeAction: adminHook });

Template.novaNoticia.events({
    'submit #add-noticia': function(event) {
        var title = event.target.title.value;
        var body = event.target.body.value;

        if(title && body){
            Noticias.insert({title:title, body:body, created:new Date});
            Router.go('/admin/noticias/');
        }
        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    }
});


// Página de editar noticia
Router.route('/admin/noticias/:_id', function () {
  this.layout('painelAdmin');
  this.render('editNoticia');
},{ name:'editNoticia',
    onBeforeAction: adminHook });

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
            Router.go('/admin/noticias/');
        }
        else{
            alert('Por favor preencha todos os campos');
        }
        return false;
    }
});



