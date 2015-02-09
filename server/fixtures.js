if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'Secomper',
        email: 'secomper@gmail.com',
        password: 'secomp2015',
        profile:{
            points: 1200,
            admin:false
        }

    });

    Accounts.createUser({
        username: 'admin',
        email: 'admin@secomp.com',
        password: 'admin',
        profile:{
            admin:true
        }
    });
}
