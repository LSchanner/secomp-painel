// Routes e coisas relativas à navegação/interação com página de admin

//hook de obrigar o login de admin
adminHook = function() {
    if(!Meteor.user().profile.admin){
        this.redirect('login');
    }
    this.next();
}

// Dashboard
Router.route('/admin/', function () {
    this.layout('admin-painel');
    this.render('admin-dashboard');
},{ name:'admin-dashboard',
    onBeforeAction: adminHook });

// Notícias
Router.route('/admin/noticias', function () {
    this.layout('admin-painel');
    this.render('admin-noticias');
},{ name:'admin-noticias',
    onBeforeAction: adminHook });

// Atividades
Router.route('/admin/atividades', function () {
    this.layout('admin-painel');
    this.render('admin-atividades');
},{ name:'admin-atividades',
    onBeforeAction: adminHook });

// credenciamento
Router.route('/admin/credenciamento', function () {
    this.layout('admin-painel');
    this.render('admin-credenciamento');
},{ name:'admin-credenciamento',
    onBeforeAction: adminHook });

// achievements
Router.route('/admin/achievements', function () {
    this.layout('admin-painel');
    this.render('admin-achievements');
},{ name:'admin-achievements',
    onBeforeAction: adminHook });

// loja
Router.route('/admin/loja', function () {
    this.layout('admin-painel');
    this.render('admin-loja');
},{ name:'admin-loja',
    onBeforeAction: adminHook });


Template.admin-painel.helpers({
    atRoute: function(path){
        return path === Router.current().route.getName();
    },
});

Template.admin-painel.events({
    'click .navbar-collapse ul li a': function(){
        $('.navbar-collapse').collapse('hide');
    }
});

