// função que valida submissão
auth = function(userId, instance){
    return Meteor.users.findOne(userId).profile.admin;
}

Meteor.publish('Noticias', function() {
      return Noticias.find();
});

Noticias.allow({
    insert: auth,
    update: auth,
    remove: auth
});
