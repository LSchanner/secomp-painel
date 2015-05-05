Template.painel.helpers({
    atRoute: function(path){
        return path === Router.current().route.getName();
    },
    username: function(){
        return Meteor.user().profile.nome;
    },
    isMod: function(){
        return Roles.userIsInRole(Meteor.userId(),"moderador");
    }

});

Template.painel.events({
    'click .navbar-collapse ul li a': function(){
        $('.navbar-collapse').collapse('hide');
    },

    'click #logout-button':function(){
        Meteor.logout(function() {
            Router.go('/');
        });
    }
});
