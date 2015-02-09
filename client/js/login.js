Template.login.events({
    "submit #loginform": function(event){
        var email = event.target.email.value;
        var password = event.target.password.value;

        Meteor.loginWithPassword(email,password,function(Error){
            if(Error){
                Session.set('erroLogin',true)
            }
            else if(Meteor.user().profile.admin){
                Router.go('/admin');
            }
            else {
                Router.go('/');
            }
        }); 

        return false;
    }
});
Template.login.helpers({
    erro:function(){
        return Session.get('erroLogin');
    }
});
