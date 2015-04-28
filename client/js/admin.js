// Routes e coisas relativas à navegação/interação com página de admin

//hook de obrigar o login de admin
adminHook = function() {
    if(!Roles.userIsInRole(Meteor.userId(),"moderador")){
        console.log(Meteor.user())
        Router.go('/login');
    }
    this.next();
}

// Dashboard
Router.route('/moderador', function () {
    this.layout('painelAdmin');
    this.render('adminDashboard');
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
    this.layout('painelAdmin');
    this.render('adminAtividades');
},{ name:'admin-atividades',
    onBeforeAction: adminHook });

// credenciamento
Router.route('/moderador/credenciamento', function () {
    this.layout('painelAdmin');
    this.render('adminCredenciamento');
},{ name:'admin-credenciamento',
    onBeforeAction: adminHook });

// achievements
Router.route('/moderador/achievements', function () {
    this.layout('painelAdmin');
    this.render('adminAchievements');
},{ name:'admin-achievements',
    onBeforeAction: adminHook });

// loja
Router.route('/moderador/loja', function () {
    this.layout('painelAdmin');
    this.render('adminLoja');
},{ name:'admin-loja',
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

