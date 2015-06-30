Template.novaAtividade.events({
    'submit #add-atividade': function(event) {
        var title = event.target.title.value;
        var palestrante = event.target.palestrante.value;
        var description = event.target.description.value;
        var begin = event.target.begin.value;
        var end = event.target.end.value;
        var pontuacao = event.target.pontuacao.value;
        var num_max_inscritos = event.target.nummaxinscritos.value;
        var requires_inscricao;

        if(num_max_inscritos === 0){
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
    }
});


Template.ListaAtividades.helpers({
    atividades: function(){
        return Atividades.find({},{sort:{begin:-1},limit:Session.get('pag') * 10});
    },
    temMais: function() {
        return Atividades.find().count() > Session.get('pag') * 10;
    },
    searched_atividades: function(){
        var search = Session.get('searchString') ;
        return Atividades.find({
            $or:[{'title':{$regex:search, $options:'i'}},
               {'description':{$regex:search, $options:'i'}},
               {'palestrante':{$regex:search, $options:'i'}},
               {'begin':{$regex:search, $options:'i'}},
            ]
        });
    }
});

Template.ListaAtividades.events({
    'click #tem-mais':function(event){
        Session.set('pag',Session.get('pag') + 1);
    },
    'keyup #search': function(event,t){
        Session.set("searchString",event.target.value);
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

Template.userOnActivities.events({
    "click .toggle-checked": function (event) {
        var atividade = Atividades.findOne(Router.current().params._id);
        console.log("atividade : " + atividade);
        var listaCompareceram = atividade.presentes;
        console.log("lista dos que compareceram: " + listaCompareceram);
        var credId = this;
        console.log("Esse é o id que deve ser tirado ou colocado: " + credId);

        console.log('Verificando se precisa tirar ou colocar:');

        console.log( listaCompareceram.find(credId) );

        if( (listaCompareceram.find(credId) !== undefined) ){
            console.log("Não havia...");
            listaCompareceram.push(credId);
            return true;
        }

        console.log("Havia...");
        listaCompareceram.pop(credId);
        return false;
    }
});

Template.userOnActivities.helpers({
    checked: function() {
        var listaCompareceram = (Atividades.findOne(atividadeId)).presentes;
        if(listaCompareceram.find(this)){
            return true;
        }
        return false;
    },
});
