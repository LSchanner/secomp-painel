if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'Secomper',
        email: 'secomper@gmail.com',
        password: 'secomp2015',
        profile:{
            nome: 'Secomper',
            email: 'secomper@gmail.com',
            documento: 'ra 156412'
        }

    });

    var id = Accounts.createUser({
        username: 'admin',
        email: 'admin@secomp.com',
        password: 'admin',
        profile:{
            nome: 'admin',
            email: 'admin@secomp.com',
            documento: '02065464131'
        }
    });
    Roles.addUsersToRoles(id, ['moderador'])
}
