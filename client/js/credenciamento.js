// página que lista os usuários não credenciados
Template.adminCredenciamento.helpers({
    users: function(){
        return Meteor.users.find();
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


Template.credenciaUser.helpers({
    user: function(){
        return Meteor.users.findOne(Router.current().params._id);
    },
    credId: function(user_id){
        var cred = Credenciamentos.findOnde({user_id:user_id});
        if(cred){
            return cred._id;
        }
        else{
            return false;
        }
    }

});

Template.credenciaUser.events({
    "submit #FormCredencia":function(event){
        var cred_id = event.target.idCredenciamento.value;
        console.log(cred_id);
        if(cred_id){
            var credenciamento = {
                user_id: Router.current().params._id ,
                _id: cred_id,
                pontos: 0,
                atividades:[],
                achievements:[],
                compras:[],
            }
            Credenciamentos.insert(credenciamento); 
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
