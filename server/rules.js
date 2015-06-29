// função que valida submissão
authAdmin = function(userId, instance){
    return Roles.userIsInRole(userId,['moderador']);
}

/* Here we allow users(admin) to change the database*/
/* To change news(Noticias) */
Meteor.publish('Noticias', function() {
      return Noticias.find();
});

Noticias.allow({
    insert: authAdmin,
    update: authAdmin,
    remove: authAdmin
});

/* To change activities(Atividade) */
Meteor.publish('Atividades', function() {
      return Atividades.find();
});

Atividades.allow({
    insert: authAdmin,
    update: authAdmin,
    remove: authAdmin
});

/* To change Achievements */
Meteor.publish('Achievements', function() {
      if(authAdmin(this.userId)){
          return Achievements.find();
      }else{
          return Achievements.find({},{fields:{title:1,description:1}})
      }
});

Achievements.allow({
    insert: authAdmin,
    update: authAdmin,
    remove: authAdmin
});

/* To change Credenciamento */
Meteor.publish('Credenciamentos', function() {
      if(authAdmin(this.userId,null)){
          return Credenciamentos.find();
      }
      else{
          return Credenciamentos.find({user_id:this.userId});
      }
});

Credenciamentos.allow({
    update: authAdmin,
    remove: authAdmin
});

/* ---- */
Meteor.publish("allUserData", function () {
    if(authAdmin(this.userId, null)){
        return Meteor.users.find({});
    }
});
