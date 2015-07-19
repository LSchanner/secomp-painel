
// página que lista os usuários não credenciados
Template.adminCredenciamento.helpers({
    users: function(){
        search = Session.get('searchString') ;
        return Meteor.users.find({
            $or:[{'profile.nome':{$regex:search}},
               {'emails.address':{$regex:search}},
               {'profile.cpf':{$regex:search}},
            ]
        });
    }
});
Template.adminCredenciamento.events({
    'keyup #search': function(event,t){
        Session.set("searchString",event.target.value);
    }
});

Template.userListItem.events({
    'click': function(event){
        var data = Template.currentData();
        Router.go('/moderador/credenciamento/' + data._id);
    }
});


Router.route('/moderador/credenciamento/:_id', function () {
  this.layout('painelAdmin');
  this.render('credenciaUser');
},{ name:'credenciaUser',
    onBeforeAction: adminHook });

var getUser = function(){
    return Meteor.users.findOne(Router.current().params._id);
}

Template.credenciaUser.helpers({
    user: getUser ,
    credId: function(user_id){
        var cred = Credenciamentos.findOne({user_id:user_id});
        if(cred){
            return cred._id;
        }
        else{
            return false;
        }
    },
    pago:function(){
        var usr = getUser();
        if(usr.pago == null){
            return true;
        }
        return usr.pago
    }

});

Template.credenciaUser.events({
    "submit #FormCredencia":function(event){
        var cred_id = event.target.idCredenciamento.value;
        if(cred_id){
            Meteor.call("credenciaUser",Router.current().params._id,cred_id);
        }
        return false;
    }
});

Template.UserProfile.helpers({
    arrayfi: function(obj){
        result = [];
        for (var key in obj) result.push({name:key,value:obj[key]});
        return result;
    }
});
