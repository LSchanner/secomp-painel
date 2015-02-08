// Routes e coisas relativas à navegação/interação com o aplicativo

//hook de login
loginHook = function() {
    if(!(Meteor.user())){
        this.render('login');
    }
    this.next();
}

// Página de login
Router.route('/login', function () {
    this.render('login');
},{name:'login'});


// Dashboard
Router.route('/', function () {
    this.layout('painel');
    this.render('dashboard');
},{ name:'dashboard',
    onBeforeAction: loginHook });




Template.painel.helpers({
    atRoute: function(path){
        return path === Router.current().route.getName();
    },
    username: function(path){
        return Meteor.user().username;
    }
});
