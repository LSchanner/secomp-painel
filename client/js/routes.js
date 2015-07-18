/* Routes e coisas relativas à navegação/interação com o aplicativo */

// Hook de obrigar o login a ser feito na página '/'
loginHook = function() {
    if(Meteor.user() === null){
        this.redirect('login');
    }
    this.next();
};

// Página de login
Router.route('/login', function () {
    this.render('login');
},{name:'login'});

// Página do termos de contrato
Router.route('/condicoes', function () {
    this.render('condicoes');
},{name:'condicoes'});
// Página de Cadastro
Router.route('/cadastro', function () {
    this.render('cadastro');
},{name:'cadastro'});
// Recuperar Senha
Router.route('/recover-password',function(){
    this.render('forgotPassword');
},{name:'recover-password'});
// Resetar a senha
Router.route('/reset-password', function(){
    this.render('ResetPassword');
    //Session.set('alert', 'Pagina não disponivel');
},{name:'reset-password'});


// Dashboard
Router.route('/', function () {
    this.redirect('/noticias/');
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

// Página de adicionar notícia
Router.route('/moderador/noticias/nova/', function () {
    this.layout('painelAdmin');
    this.render('novaNoticia');
},{ name:'novaNoticia',
    onBeforeAction: adminHook });

// Página de editar noticia
Router.route('/moderador/noticias/:_id', function () {
  this.layout('painelAdmin');
  this.render('editNoticia');
},{ name:'editNoticia',
    onBeforeAction: adminHook });

// Atividades
Router.route('/atividades', function () {
    Session.set("searchString","");
    this.layout('painel');
    this.render('atividades');
},{ name:'atividades',
    onBeforeAction: loginHook });

// Atividade
Router.route('/atividades/:_id', function () {
    this.layout('painel');
    this.render('showatividade');
},{ name:'atividade',
    onBeforeAction: loginHook });

// Formulário de atividade
Router.route('/atividades/:_id/feedback', function () {
    this.layout('painel');
    this.render('feedback');
},{ name:'feedback',
    onBeforeAction: loginHook });


// Página de adicionar atividade
Router.route('/moderador/atividades/nova/', function () {
    this.layout('painelAdmin');
    this.render('novaAtividade');
},{ name:'novaAtividade',
    onBeforeAction: adminHook });

// Página de editar atividades :)
Router.route('/moderador/atividades/:_id', function () {
    Session.set('editar', false);
    this.layout('painelAdmin');
    this.render('editAtividade');
},{ name:'editAtividade',
    onBeforeAction: adminHook });


// calendario
Router.route('/calendario', function () {
    this.layout('painel');
    this.render('calendario');
},{ name:'calendario',
    onBeforeAction: loginHook });


// Achievements
Router.route('/achievements', function () {
    Session.set("searchString","");
    this.layout('painel');
    this.render('achievements');
},{ name:'achievements',
    onBeforeAction: loginHook });

// Pagina de cada achievement
Router.route('/achievements/:_id', function () {
    this.layout('painel');
    this.render('showAchievement');
},{ name:'showAchievement',
    onBeforeAction: loginHook });

// Página de adicionar achievements
Router.route('/moderador/achievements/novo/', function () {
    this.layout('painelAdmin');
    this.render('novoAchievement');
},{ name:'novoAchievement',
    onBeforeAction: adminHook });

// Página de editar achievements
Router.route('/moderador/achievements/:_id', function () {
    Session.set('editar', false);
    this.layout('painelAdmin');
    this.render('editAchievement');
},{ name:'editAchievement',
    onBeforeAction: adminHook });


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
