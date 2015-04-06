// função que valida submissão
authAdmin = function(userId, instance){
    return Roles.userIsInRole(userId,['moderador']);
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
      if("moderador" in Meteor.user().roles ){
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

Meteor.publish("allUserData", function () {
    if(Meteor.users.findOne(this.userId).admin){
        return Meteor.users.find({});
    }
});

Meteor.publish("userData", function () {
        return Meteor.users.find({_id: this.userId},
            {fields: {'admin': 1}});
});

