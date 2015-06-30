// collections
Noticias = new Mongo.Collection("Noticias");
Atividades = new Mongo.Collection("Atividades");
Achievements = new Mongo.Collection("Achievements");
//Produtos = new Mongo.Collection("Produtos");
Credenciamentos = new Mongo.Collection("Credenciamentos");

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
    requires_inscricao:{
        type: Boolean
    },
    num_max_inscritos:{
        type: Number
    },
    inscritos:{
        type: [String]
    },
    presentes:{
        type: [String]
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
    },
    atividades:{
        type: [String],
        optional:true
    },
    achievements:{
        type: [String],
        optional:true
    },
    compras:{
        type: [String],
        optional:true,
    }
});
Credenciamentos.attachSchema(Schemas.Credenciamentos);

/*Schemas.Produtos = new SimpleSchema({
    title:{
        type: String
    },
    price:{
        type: Number,
    },
    description:{
        type: String,
    },
    image_descryption:{
        type: FS.File,
    }
});
Produtos.attachSchema(Schemas.Produtos);*/



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

    },
    autoForm:{
        omitFields:['created']
    }
};
