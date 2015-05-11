Meteor.users.helpers({
    emailPrincipal: function(){
        return this.emails[0].address;
    }
});
