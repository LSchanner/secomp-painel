// função que valida submissão
authAdmin = function(userId, instance){
    return Meteor.users.findOne(userId).profile.admin;
}

Meteor.publish('Noticias', function() {
      return Noticias.find();
});

Noticias.allow({
    insert: authAdmin,
    update: authAdmin,
    remove: authAdmin
});

Meteor.publish('Atividades', function() {
      if(Meteor.user().profile.admin){
          return Atividades.find();
      }else{
          return Atividades.find({},{fields:{title:1,description:1}})
      }
});

Atividades.allow({
    insert: authAdmin,
    update: authAdmin,
    remove: authAdmin
});


