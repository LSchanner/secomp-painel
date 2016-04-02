// Routes e coisas relativas à navegação/interação com página de admin

//hook de obrigar o login de admin
adminHook = function() {
    setTimeout(function (){
        if(!Roles.userIsInRole(Meteor.userId(),"moderador")){
            Router.go('/');
        }
    },2000);
    this.next();
}

// Dashboard
Router.route('/moderador', function () {
    this.redirect('/moderador/credenciamento');
},{ name:'admin-dashboard',
    onBeforeAction: adminHook });

// Notícias
Router.route('/moderador/noticias/', function () {
    this.layout('painelAdmin');
    this.render('adminNoticias');
},{ name:'admin-noticias',
    onBeforeAction: adminHook });

// Atividades
Router.route('/moderador/atividades', function () {
    Session.set("searchString","");
    this.layout('painelAdmin');
    this.render('adminAtividades');
},{ name:'admin-atividades',
    onBeforeAction: adminHook });

// credenciamento
Router.route('/moderador/credenciamento', function () {
    Session.set("searchString","");
    this.layout('painelAdmin');
    this.render('adminCredenciamento');
},{ name:'admin-credenciamento',
    onBeforeAction: adminHook });

Router.route('/moderador/credenciamento/:_id', function () {
  this.layout('painelAdmin');
  this.render('credenciaUser');
},{ name:'credenciaUser',
    onBeforeAction: adminHook });


// achievements
Router.route('/moderador/achievements', function () {
    Session.set("searchString","");
    this.layout('painelAdmin');
    this.render('adminAchievements');
},{ name:'admin-achievements',
    onBeforeAction: adminHook });

// loja
Router.route('/moderador/relatoriopresenca', function () {
    this.layout('painelAdmin');
    this.render('relatorio-presenca');
},{ name:'relatorio-presenca',
    onBeforeAction: adminHook });


Template.painelAdmin.helpers({
    atRoute: function(path){
        return path === Router.current().route.getName();
    }
});

Template.painelAdmin.events({
    'click .navbar-collapse ul li a': function(){
        $('.navbar-collapse').collapse('hide');
    }
});
