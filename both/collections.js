// collections
Noticias = new Mongo.Collection("Noticias");
Atividades = new Mongo.Collection("Atividades");
  
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
})
Noticias.attachSchema(Schemas.Noticias);

// Admin
AdminConfig = {
    name: 'Secomp',
    collections: {
        Noticias:{}
    },
    autoForm:{
        omitFields:['created']
    }
};


