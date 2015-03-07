Template.adminCredenciamento.helpers({
    users: function(){
        return Meteor.users.find();
    }
});
