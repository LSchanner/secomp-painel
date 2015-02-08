if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'Secomper',
        email: 'secomper@gmail.com',
        password: 'secomp2015',
    });
}
