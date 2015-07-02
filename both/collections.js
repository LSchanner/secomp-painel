// collections
Noticias = new Mongo.Collection("Noticias");
Atividades = new Mongo.Collection("Atividades");
Achievements = new Mongo.Collection("Achievements");
Credenciamentos = new Mongo.Collection("Credenciamentos");
Patrocinadores = new Mongo.Collection("Patrocinadores");

// Schemas
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
    }
});
Atividades.attachSchema(Schemas.Atividades);

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

Schemas.Patrocinadores = new SimpleSchema({
    nome:{
        type: String
    },
    cota:{
        type: String
    }
});
Patrocinadores.attachSchema(Schemas.Patrocinadores);



// Admin
AdminConfig = {
    name: 'Secomp',
    collections: {
        Noticias:{
            tableColumns: [
                {label: 'Título', name: 'title'},
                {label: 'Corpo', name: 'body'},
                {label: 'Data de Publicação', name: 'created'},
            ]
        },
        Credenciamentos:{},
        Atividades:{},
        Patrocinadores:{}

    },
    autoForm:{
        omitFields:['created']
    }
};
