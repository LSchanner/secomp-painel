/* Routes e coisas relativas à navegação/interação com o aplicativo */

// Hook de obrigar o login a ser feito na página '/'
loginHook = function() {
    if(Meteor.user() === null){
        this.redirect('login');
    }
    this.next();
}

// Página de login
Router.route('/login', function () {
    this.render('login');
},{name:'login'});

// Página de Cadastro
Router.route('/cadastro', function () {
    this.render('cadastro');
},{name:'cadastro'});

// Dashboard
Router.route('/', function () {
    this.layout('painel');
    this.render('dashboard');
},{ name:'dashboard',
    onBeforeAction: loginHook });

// Notícias
Router.route('/noticias', function () {
    this.layout('painel');
    this.render('pagnoticias');
},{ name:'noticias',
    onBeforeAction: loginHook });

// Notícia
Router.route('/noticias/:_id', function () {
  this.layout('painel');
  this.render('shownoticia');
},{ name:'showNoticia',
    onBeforeAction: loginHook });



// Atividades
Router.route('/atividades', function () {
    this.layout('painel');
    this.render('atividades');
},{ name:'atividades',
    onBeforeAction: loginHook });

// calendario
Router.route('/calendario', function () {
    this.layout('painel');
    this.render('calendario');
},{ name:'calendario',
    onBeforeAction: loginHook });

// achievements
Router.route('/achievements', function () {
    this.layout('painel');
    this.render('achievements');
},{ name:'achievements',
    onBeforeAction: loginHook });

// loja
Router.route('/loja', function () {
    this.layout('painel');
    this.render('loja');
},{ name:'loja',
    onBeforeAction: loginHook });

// Mapa
Router.route('/mapa', function () {
    this.layout('painel');
    this.render('mapa');
},{ name:'mapa',
    onBeforeAction: loginHook });
