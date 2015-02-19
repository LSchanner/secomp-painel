// Routes e coisas relativas à navegação/interação com página de admin

//hook de obrigar o login de admin
adminHook = function() {
    if(false){
        this.redirect('/login');
    }
    this.next();
}

// Dashboard
Router.route('/admin', function () {
    this.layout('painelAdmin');
    this.render('adminDashboard');
},{ name:'admin-dashboard',
    onBeforeAction: adminHook });

// Notícias
Router.route('/admin/noticias/', function () {
    this.layout('painelAdmin');
    this.render('adminNoticias');
},{ name:'admin-noticias',
    onBeforeAction: adminHook });

// Atividades
Router.route('/admin/atividades', function () {
    this.layout('painelAdmin');
    this.render('adminAtividades');
},{ name:'admin-atividades',
    onBeforeAction: adminHook });

// credenciamento
Router.route('/admin/credenciamento', function () {
    this.layout('painelAdmin');
    this.render('adminCredenciamento');
},{ name:'admin-credenciamento',
    onBeforeAction: adminHook });

// achievements
Router.route('/admin/achievements', function () {
    this.layout('painelAdmin');
    this.render('adminAchievements');
},{ name:'admin-achievements',
    onBeforeAction: adminHook });

// loja
Router.route('/admin/loja', function () {
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

