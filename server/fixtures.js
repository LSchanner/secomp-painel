if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'Secomper',
        email: 'secomper@gmail.com',
        password: 'secomp2015',
        profile:{
            nome: 'Secomper'
        }

    });

    var id = Accounts.createUser({
        username: 'admin',
        email: 'admin@secomp.com',
        password: 'admin',
        profile:{
            nome: 'admin'
        }
    });
    Meteor.users.update({_id:id},{$set:{admin:true}});
}
