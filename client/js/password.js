Template.forgotPassword.events({
    "submit #forgotPasswordForm": function(event){
        if(event.target.email){
            var email = event.target.email.value;
            Meteor.call('sendResetPassword', email)
            Session.set('envio', '1');
        }
        return false;
    }
});

Template.forgotPassword.helpers({
    sucesso:function(){
        return Session.get('envio');
    },
});


Template.ResetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    }
});
