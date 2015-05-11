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


