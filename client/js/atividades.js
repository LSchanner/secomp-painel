
/* ---- ListaAtividades ---- */
Template.ListaAtividades.helpers({
    temMais: function() {
        return Atividades.find().count() > Session.get('pag') * 10;
    },
    searched_atividades: function(){
        var search = Session.get('searchString');
        var min_date = new Date(0);
        if(Session.get("filtro_proximas")){
            min_date = new Date();
        }
        var filtro_inscricao = Session.get("filtro_inscricao");
        var filtro_feedback = Session.get("filtro_feedback");
        var query = {
            $or:[{'title':{$regex:search, $options:'i'}},
               {'description':{$regex:search, $options:'i'}},
               {'palestrante':{$regex:search, $options:'i'}},
               {'begin':{$regex:search, $options:'i'}},
               {'modelo':{$regex:search, $options:'i'}},
            ],
            end:{$gt:min_date},
        }
        if(filtro_inscricao){
            query.requires_inscricao = filtro_inscricao;
        }
        if(filtro_feedback){
            var credId = Credenciamentos.findOne({user_id:Meteor.userId()})._id;
            query.presentes = credId;
            query['feedback.credId'] = {$not:credId};
        }

        return Atividades.find(query,{sort:{begin:1},limit:Session.get('pag') * 10});
    },
    filtro_proximas:function(){
        return Session.get("filtro_proximas");
    },
    filtro_inscricao:function(){
        return Session.get("filtro_inscricao");
    },
    filtro_feedback:function(){
        return Session.get("filtro_feedback");
    }
});

Template.ListaAtividades.events({
    'click #tem-mais':function(event){
        Session.set('pag',Session.get('pag') + 1);
    },
    'keyup #search': function(event,t){
        Session.set("searchString",event.target.value);
    },
    'click #filtro_proximas':function(event){
        Session.set("filtro_proximas",!Session.get("filtro_proximas"));
    },
    'click #filtro_inscricao':function(event){
        Session.set("filtro_inscricao",!Session.get("filtro_inscricao"));
    },
    'click #filtro_feedback':function(event){
        Session.set("filtro_feedback",!Session.get("filtro_feedback"));
    }
});

Template.ListaAtividades.onRendered(function(){
   Session.set('pag',1);
   Session.set('filtro_inscricao',false);
   Session.set('filtro_proximas',false);
   Session.set('filtro_feedback',false);
});


/* ---- showatividade ---- */
Template.showatividade.helpers({
    atividade: function(){
        return Atividades.findOne(Router.current().params._id);
    },
    format: function(date) {
        return moment(date).format('LLLL');
    },
    duracao: function(begin,end){
        var delta = moment(begin).diff(moment(end));
        return moment.duration(delta).humanize();
    },
    nao_credenciado: function(){
        return !(Credenciamentos.findOne({user_id:Meteor.userId()}));
    },
    inscrito: function(atividade){
        var cred = Credenciamentos.findOne({user_id:Meteor.userId()});
        return atividade.inscritos.indexOf(cred._id) != -1;
    },
    lotado: function(atividade){
        return atividade.inscritos.length >= atividade.num_max_inscritos;
    },
    semInscrições: function(){
        var cred = Credenciamentos.findOne({user_id:Meteor.userId()});
        return Atividades.find({inscritos:cred._id}).count() >= Settings.num_max_inscricoes;
    },
    num_max_inscricoes: function(){
        return Settings.num_max_inscricoes;
    },
    compareceu: function(){
        var atividade = Atividades.findOne(Router.current().params._id);
        var credId = Credenciamentos.findOne({user_id:Meteor.userId()})._id;
        var feedbacks = atividade.feedback.map(function(obj){
            return obj.credId;
        });
        var presenca =  (atividade.presentes.indexOf(credId) != -1);
        var feedback =  (feedbacks.indexOf(credId) != -1);

        console.log(presenca);
        console.log(credId);
        return( presenca && !feedback);
    }

});

Template.showatividade.events({
    "click #inscrever": function(event){
        Meteor.call("inscricaoAtividade", Router.current().params._id );
    }
});


/* ---- Atividade ---- */
Template.Atividade.helpers({
    format: function(date) {
        return moment(date).format('LLLL');
    },
    encurta: function(body){
        return $(body).text().substring(0,200) + ' ...';
    }
});

var get_perguntas = function(){
        var modelo = get_atividade().modelo;
        return Perguntas.find({modelos:modelo});
}
var get_atividade = function(){
    return Atividades.findOne(Router.current().params._id);
}

Template.feedback.helpers({
    atividade: get_atividade,
    format: function(date) {
        return moment(date).format('LLL');
    },
    duracao: function(begin,end){
        var delta = moment(begin).diff(moment(end));
        return moment.duration(delta).humanize();
    },
    perguntas: get_perguntas
});
Template.feedback.events({
    'submit #feedback':function(event) {
        surveyItems = {};
        get_perguntas().forEach(function(obj){
            surveyItems[obj._id] = event.target[obj._id].value;
        });

        Meteor.call('submitFeedback',get_atividade()._id,surveyItems);
        Router.go('/atividades/')
        return false;
    }
});
