// collections
Noticias = new Mongo.Collection("Noticias");
Atividades = new Mongo.Collection("Atividades");
Credenciamentos = new Mongo.Collection("Credenciamentos");
  
// Schemas
Schemas = {}
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
                return new Date;
            }
        }

    }
});
Noticias.attachSchema(Schemas.Noticias);

Schemas.Credenciamentos = new SimpleSchema({
    user_id:{
        type: Number
    },
    Id_Credenciamento:{
        type: Number
    },
    pontos:{
        type: Number
    },
    atividades:{
        type: [Number]
    },
    achievements:{
        type: [Number]
    },
    compras:{
        type: [Number]
    }
});
Credenciamentos.attachSchema(Schemas.Credenciamentos);

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
        Credenciamentos:{}

    
    },
    autoForm:{
        omitFields:['created']
    }
};


