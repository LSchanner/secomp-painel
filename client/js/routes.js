/* Routes e coisas relativas à navegação/interação com o aplicativo */


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
},{name:'reset-password'});


// Dashboard
Router.route('/', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.redirect('/noticias/');
    }
},{ name:'dashboard'});


// Notícias
Router.route('/noticias', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('pagnoticias');
    }
},{ name:'noticias'});

// Notícia
Router.route('/noticias/:_id', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('shownoticia');
    }
},{ name:'showNoticia' });

// Página de adicionar notícia
Router.route('/moderador/noticias/nova/', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painelAdmin');
        this.render('novaNoticia');
    }
},{ name:'novaNoticia',
    onBeforeAction: adminHook});

// Página de editar noticia
Router.route('/moderador/noticias/:_id', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painelAdmin');
        this.render('editNoticia');
    }
},{ name:'editNoticia',
    onBeforeAction: adminHook});

// Atividades
Router.route('/atividades', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        Session.set("searchString","");
        this.layout('painel');
        this.render('atividades');
    }
},{ name:'atividades' });

// Atividade
Router.route('/atividades/:_id', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('showatividade');
    }
},{ name:'atividade' });

// Formulário de atividade
Router.route('/atividades/:_id/feedback', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('feedback');
    }
},{ name:'feedback' });


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

// Loja
Router.route('/loja', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('loja');
    }
},{ name:'loja' });

// Achievements
Router.route('/achievements', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        Session.set("searchString","");
        this.layout('painel');
        this.render('achievements');
    }
},{ name:'achievements'});

// Pagina de cada achievement
Router.route('/achievements/:_id', function () {
    if(Meteor.user() === null){
        this.redirect('login');
    }else{
        this.layout('painel');
        this.render('showAchievement');
    }
},{ name:'showAchievement'});

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
