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
                presentes: [],
                feedback: []
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
    },
    numero_presentes: function(){
        var atividade = Atividades.findOne(Router.current().params._id);
        return atividade.presentes.length;
    },
    backward: function(list){
        list.reverse();
        return list;
    }
});

Template.editAtividade.events({
    'submit #edit-atividade':function(event){
        var title = event.target.title.value;
        var palestrante = event.target.palestrante.value;
        var description = event.target.description.value;
        var begin = event.target.begin.value;
        var end = event.target.end.value;
        var pontuacao = event.target.pontuacao.value;
        var modelo = event.target.modelo.value;
        var num_max_inscritos;

        var atividade = Atividades.findOne(Router.current().params._id);
        //Verifica se houve alguma alteração na data, e se não, aplica a data
        //anterior
        if(begin == ""){
            begin = atividade.begin;
        }
        if(end == ""){
            end = atividade.end;
        }

        //Verifica se o numero de incritos foi modificado e se o numero inserido
        // é valido
        if(event.target.nummaxinscritos){
            if(event.target.nummaxinscritos.value < atividade.num_max_inscritos){
                alert("Você não pode diminuir o número de vagas de uma atividade");
                return false;
            }
            num_max_inscritos = event.target.nummaxinscritos.value;
        }else{
            num_max_inscritos = 0;
        }

        if(title && description){
            Atividades.update(Router.current().params._id,{
                $set:{
                    title: title,
                    description: description,
                    palestrante: palestrante,
                    begin: new Date(begin),
                    end: new Date(end),
                    pontuacao: pontuacao,
                    modelo:modelo,
                    num_max_inscritos: num_max_inscritos,
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
        event.target.credenciado.value = "";
        return false;
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
