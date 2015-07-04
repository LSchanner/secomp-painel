/* ---- novaAtividade ---- */
Template.novaAtividade.events({
    'submit #add-atividade': function(event) {
        var title = event.target.title.value;
        var palestrante = event.target.palestrante.value;
        var description = event.target.description.value;
        var begin = event.target.begin.value;
        var end = event.target.end.value;
        var pontuacao = event.target.pontuacao.value;
        var num_max_inscritos = event.target.nummaxinscritos.value;
        var modelo = event.target.modelo.value;
        var requires_inscricao;

        if(num_max_inscritos == 0){
            requires_inscricao = false;
        }else{
            requires_inscricao = true;
        }

        if(title && description && begin && end && pontuacao){
            Atividades.insert({
                title: title,
                description: description,
                palestrante: palestrante,
                begin: new Date(begin),
                end: new Date(end),
                pontuacao: pontuacao,
                modelo:modelo,
                num_max_inscritos: num_max_inscritos,
                requires_inscricao: requires_inscricao,
                inscritos: [],
                presentes: []
            });
            Router.go('/moderador/atividades/');
        }

        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    }
});


/* ---- editAtividade ---- */
Template.editAtividade.helpers({
    atividade: function(){
        return Atividades.findOne(Router.current().params._id);
    },
    editar: function(){
        return Session.get('editar');
    }
});

Template.editAtividade.events({
    'submit #edit-atividade':function(event){
        var title = event.target.title.value;
        var palestrante = event.target.palestrante.value;
        var description = event.target.description.value;

        if(title && description){
            Atividades.update(Router.current().params._id,{
                $set:{
                    title:title,
                    description:description,
                    palestrante:palestrante,
                }
            });
            Router.go('/moderador/atividades/');
        }

        else{
            alert('Por favor preencha todos os campos');
        }

        return false;
    },
    'click #delete-button': function(event){
        Atividades.remove(Router.current().params._id);
        Router.go('/moderador/noticias/');
    },
    'click #edit-button': function(event){
        Session.set('editar', true);
    },
    "submit #inserir_credenciado": function(event){
        var numero = event.target.credenciado.value;
        if(Credenciamentos.findOne(numero)){
            Atividades.update(Router.current().params._id,{
                $addToSet:{presentes:numero}
            });
        }
        Meteor.call('updatePontuacao',numero);
        return false;
    }
});


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


/* ---- userOnActivities ---- */
Template.userOnActivities.events({
    "click .toggle-checked": function (event) {
        var atividade = Atividades.findOne(Router.current().params._id);
        var credId = String(this);

        if(event.target.checked){
            Atividades.update(Router.current().params._id,{
                $addToSet:{presentes:credId}
            });
        }
        else{
            Atividades.update(Router.current().params._id,{
                    $pull:{presentes:credId}
            });
        }
        Meteor.call('updatePontuacao',credId);
    }
});

Template.userOnActivities.helpers({
    checked: function() {
        var listaCompareceram = (Atividades.findOne(Router.current().params._id)).presentes;
        var credId = String(this);
        if(listaCompareceram.indexOf(credId) != -1){
            return "checked";
        }
        return false;
    },
});
