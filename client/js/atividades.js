Template.novaAtividade.events({
    'submit #add-atividade': function(event) {
        var title = event.target.title.value;
        var palestrante = event.target.palestrante.value;
        var description = event.target.description.value;
        var begin = event.target.begin.value;
        var end = event.target.end.value;
        var pontuacao = event.target.pontuacao.value;
        var num_max_inscritos = event.target.nummaxinscritos.value;

        if(num_max_inscritos == 0){
            var requires_inscricao = false;
        }else{
            var requires_inscricao = true;
        }

        if(title && description && begin && end && pontuacao){
            Atividades.insert({
                title: title,
                description: description,
                palestrante: palestrante,
                begin: new Date(begin),
                end: new Date(end),
                pontuacao: pontuacao,
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

Template.editAtividade.helpers({
    atividade: function(){
        return Atividades.findOne(Router.current().params._id);
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
    }
});


Template.ListaAtividades.helpers({
    atividades: function(){
        return Atividades.find({},{sort:{begin:-1},limit:Session.get('pag') * 10});
    },
    temMais: function() {
        return Atividades.find().count() > Session.get('pag') * 10;
    }
});

Template.ListaAtividades.events({
    'click #tem-mais':function(event){
        Session.set('pag',Session.get('pag') + 1);
    }
});

Template.ListaAtividades.onRendered(function(){
   Session.set('pag',1);
});

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
    inscricao_aberta: function(atividade){
        var cred = Credenciamentos.findOne({user_id:Meteor.userId()});
        return (
            atividade.inscritos.length <= atividade.num_max_inscritos  && 
            Atividades.find({inscritos:cred._id}).count() < num_max_inscricoes &&
            atividade.inscritos.indexOf(cred._id) == -1 
            )
    },
    num_max_inscricoes: function(){
        return num_max_inscricoes;
    }
});

Template.showatividade.events({
    "click #inscrever": function(event){
        Meteor.call("inscricaoAtividade",Router.current().params._id);
    }
});

Template.Atividade.helpers({
    format: function(date) {
        return moment(date).format('LLL');
    },
    encurta: function(body){
        return $(body).text().substring(0,200) + ' ...';
    }
});