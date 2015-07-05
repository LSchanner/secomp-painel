
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
        return Atividades.find({
            $or:[{'title':{$regex:search, $options:'i'}},
               {'description':{$regex:search, $options:'i'}},
               {'palestrante':{$regex:search, $options:'i'}},
               {'begin':{$regex:search, $options:'i'}},
               {'modelo':{$regex:search, $options:'i'}},
            ],
            end:{$gt:min_date},
            requires_inscricao:{$in:[true,filtro_inscricao]}
        },{sort:{begin:1},limit:Session.get('pag') * 10});
    },
    filtro_proximas:function(){
        return Session.get("filtro_proximas");
    },
    filtro_inscricao:function(){
        return Session.get("filtro_inscricao");
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
    }
});

Template.ListaAtividades.onRendered(function(){
   Session.set('pag',1);
   Session.set('filtro_inscricao',false);
   Session.set('filtro_proximas',false);
});


/* ---- showatividade ---- */
Template.showatividade.helpers({
    atividade: function(){
        return Atividades.findOne(Router.current().params._id);
    },
    format: function(date) {
        return moment(date).format('LLL');
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
        return Atividades.find({inscritos:cred._id}).count() >= num_max_inscricoes;
    },
    num_max_inscricoes: function(){
        return num_max_inscricoes;
    },
    compareceu: function(){
        var atividade = Atividades.findOne(Router.current().params._id);
        var credId = Credenciamentos.findOne({user_id:Meteor.userId()})._id;
        var feedbacks = atividade.feedback.map(function(obj){
            return obj.credId;
        });
        return((atividade.presentes.indexOf(credId) != -1) &&
               (feedbacks.indexOf(credId) == -1)); 
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
        return moment(date).format('LLL');
    },
    encurta: function(body){
        return $(body).text().substring(0,200) + ' ...';
    }
});

Template.feedback.helpers({
    atividade: function(){
        return Atividades.findOne(Router.current().params._id);
    },
    format: function(date) {
        return moment(date).format('LLL');
    },
    duracao: function(begin,end){
        var delta = moment(begin).diff(moment(end));
        return moment.duration(delta).humanize();
    },
    perguntas: function(){
        var modelo = Atividades.findOne(Router.current().params._id).modelo;
        console.log(modelo);
        return Perguntas.find({modelos:modelo});
    }
});


