// Collection
// Aqui estão as estruturas de dados do banco de dados
// O cadastro de usuario não está aqui, ele esta implementado em Accounts (veja Accounts meteor)
// Ver mais mongo schema (https://github.com/aldeed/meteor-simple-schema)

Noticias = new Mongo.Collection("Noticias");
Atividades = new Mongo.Collection("Atividades");
Achievements = new Mongo.Collection("Achievements");
Credenciamentos = new Mongo.Collection("Credenciamentos");
Patrocinadores = new Mongo.Collection("Patrocinadores");
Perguntas = new Mongo.Collection("Perguntas");

// Schemas de Noticia
Schemas = {};
Schemas.Noticias = new SimpleSchema({
    title:{
        type: String
    },
    body:{
        type: String
    },
    created:{
        type: Date,
        autoValue: function(){
            if(this.isInsert){
                return new Date();
            }
        }
    }
});
Noticias.attachSchema(Schemas.Noticias);

// Schema de Atividades
Schemas.Atividades = new SimpleSchema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    palestrante:{
        type: String,
        optional: true
    },
    begin:{
        type: Date,
    },
    end:{
        type: Date,
    },
    pontuacao:{
        type: Number
    },
    modelo:{
        type:String,
        optional:true
    },
    requires_inscricao:{
        type: Boolean
    },
    num_max_inscritos:{
        type: Number
    },
    inscritos:{
        type: [String],
        optional:true
    },
    presentes:{
        type: [String],
        optional:true
    },
    feedback:{
        type: [Schemas.Questionario],
        optional:true
    }
});
Atividades.attachSchema(Schemas.Atividades);

// Schema de Achievements
Schemas.Achievements = new SimpleSchema({
    title:{
        type: String
    },
    pontuacao:{
        type: Number
    },
    description:{
        type: String
    },
    pedidos:{
        type:[String],
        optional:true
    },
    credenciados:{
        type: [String],
        optional:true
    }
});
Achievements.attachSchema(Schemas.Achievements);

// Schema de Credenciamento
Schemas.Credenciamentos = new SimpleSchema({
    user_id:{
        type: String
    },
    _id:{
        type: String
    },
    pontos:{
        type: Number
    }
});
Credenciamentos.attachSchema(Schemas.Credenciamentos);

// Schema de Patrocinadoress
Schemas.Patrocinadores = new SimpleSchema({
    nome:{
        type: String
    },
    cota:{
        type: String
    }
});
Patrocinadores.attachSchema(Schemas.Patrocinadores);

// Schema da feedback
// Nesse esquema, Cada pergunta é associada a um conjunto de modelos
Schemas.perguntas = new SimpleSchema({
    title:{
        type: String
    },
    modelos:{
        type:[String]
    }
});
Perguntas.attachSchema(Schemas.perguntas);
Schemas.surveyItems = new SimpleSchema({
    pergunta:{
        type: String // ID da pergunta associada à essa resposta
    },
    // Assumo que toda resposta seja um número de 0 a 5
    resposta:{
        type: Number,
        min: 0,
        max: 5
    }
});
Schemas.Questionario = new SimpleSchema({
    //Id do usuário associado à essa resposta
    credId:{
        type: String
    },
    items:{
        type: [Schemas.surveyItems]
    }
});

// Admin
AdminConfig = {
    name: 'Secomp',
    collections: {
        Noticias:{
            tableColumns: [
                {label: 'Título', name: 'title'},
            ]
        },
        Credenciamentos:{
            tableColumns: [
                {label: 'numero', name: '_id'},
            ]
        },
        Atividades:{
            tableColumns: [
                {label: 'title', name: 'title'},
            ]
        },
        Patrocinadores:{
            tableColumns: [
                {label: 'Nome', name: 'nome'},
            ]
        },
        Perguntas:{
            tableColumns: [
                {label: 'Título', name: 'title'},
            ]
        }
    },
    autoForm:{
        omitFields:['created']
    }
};
