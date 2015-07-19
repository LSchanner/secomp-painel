Template.painel.helpers({
    atRoute: function(path){
        return path === Router.current().route.getName();
    },
    username: function(){
        return Meteor.user().profile.nome;
    },
    isMod: function(){
        return Roles.userIsInRole(Meteor.userId(),"moderador");
    },
    pontuacao: function(){
        return Credenciamentos.findOne({user_id:Meteor.userId()}).pontos; 
    },
    nao_pago: function(){
        return Meteor.user().pago === false;
    },
    url_pagamento:function(){
        return 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' + Meteor.user().codePagSeguro;
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
