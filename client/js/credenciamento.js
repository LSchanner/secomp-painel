// página que lista os usuários não credenciados
Template.adminCredenciamento.helpers({
    users: function(){
        return Meteor.users.find();
    }
});
Template.userListItem.events({
    'click': function(event){
        var data = Template.currentData();
        Router.go('/admin/credenciamento/' + data._id);
    }
});


Router.route('/admin/credenciamento/:_id', function () {
  this.layout('painelAdmin');
  this.render('credenciaUser');
},{ name:'credenciaUser',
    onBeforeAction: adminHook });
