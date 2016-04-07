/* Collections Helpers */
/* Dar uma olhada em:https://github.com/dburles/meteor-collection-helpers */
Meteor.users.helpers({
    emailPrincipal: function(){
        return this.emails[0].address;
    }
});
