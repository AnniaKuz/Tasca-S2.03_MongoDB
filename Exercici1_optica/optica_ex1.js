use("optica_ex1");

db.createCollection("empleat", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nom','telefon'],
      properties: {
        nom:{
          bsonType: 'string'
        },
        telefon:{
          bsonType: 'string'
        }
      }
    }
  }
})

db.empleat.insertOne({'nom':'Albert Blasco','telefon':'642038497'});


db.createCollection("ulleres", {
  validator:{
    $jsonSchema: {
      bsonType: 'object',
      required: ['marca','graduacio','muntura','color','color_vidres','preu', 'empleat_id'],
      properties: {
        marca:{
          bsonType: 'string',
          description: 'Marca is a required field'
        },
        graduacio:{
          bsonType: 'object',
          properties: {
            esquerra: {
              bsonType: 'number'
            },
            dreta: {
              bsonType: 'number'
            }
          }
        },
        muntura: {
          enum: ['flotant','pasta','metalica']
        },
        color: {
          bsonType: 'string'
        },
        color_vidres: {
          bsonType: 'object',
          properties: {
            esquerra: {
              bsonType: 'string'
            },
            dreta: {
              bsonType: 'string'
            }
          }
        },
        preu: {
          bsonType: 'number'
        },
        empleat_id: {
          bsonType:'string'
        }
      }
}}}); 

db.ulleres.insertMany([
    {'marca': 'HarryPotter', 'graduacio':{'esquerra':0.5, 'dreta':0.75}, 'muntura':'pasta', 'color':'gris', 
    'color_vidres': {'esquerra':'negre', 'dreta':'negre'},'preu':250.95,'empleat_id':'636459d8d7687c2af3566430'
    },
    {'marca': 'ulleresUltra', 'graduacio':{'esquerra':-0.5, 'dreta':-0.5}, 'muntura':'metalica', 'color':'negre', 
    'color_vidres': {'esquerra':'transparent', 'dreta':'transparent'},'preu':295.99, 'empleat_id':'636459d8d7687c2af3566430' 
    },
    {'marca': 'Style80', 'graduacio':{'esquerra':1.5, 'dreta':1.75}, 'muntura':'pasta', 'color':'vermell', 
    'color_vidres': {'esquerra':'gris', 'dreta':'gris'},'preu':195.95,'empleat_id':'636459d8d7687c2af3566430'}]); 


db.createCollection("proveidor",{
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['nom','adressa','telefon','fax','nif', 'marques'],
        properties: {
          nom: {
            bsonType: 'string',
            description:'Name is required'
          },
          adressa: {
            bsonType: 'object',
            description:'Address is required',
            properties: {
              carrer: {
                bsonType: 'string',
                description: 'Carrer is a required field'
              },
              numero: {
                bsonType: 'string'
              },
              pis: {
                bsonType: 'string'
              },
              porta: {
                bsonType: 'string'
              },
              ciutat: {
                bsonType: 'string'
              },
              codi_postal: {
                bsonType: 'string'
              },
              pais: {
                bsonType: 'string'
              }
            }
          },
          telefon: {
            bsonType: 'string',
            description:'Telefon is required'
          },
          fax: {
            bsonType: 'string',
            description: 'Fax is required'
          },
          nif: {
            bsonType: 'string',
            description: 'Nif is required'
          },
          marques:{
            bsonType: 'array',
            required: ['ulleres'],
            properties: {
            ulleres : {
              bsonType : 'object'
            }
          }
          }
        }
      }
    }
}
); 

db.proveidor.insertMany([
  {'nom': 'UlleresX', 'adressa':{'carrer':'Pallars', 'numero':'127', 'pis':'', 'porta':'', 'ciutat':'Barcelona',
   'codi_postal':'08020', 'pais':'España'}, 'telefon': '658120467', 'fax': '614029846', 'nif':'B4861278',
   'marques':[{'ulleres':{
    "_id": "636534d3bed386276d078a5e",
    "marca": "HarryPotter",
    "graduacio": {
      "esquerra": 0.5,
      "dreta": 0.75
    },
    "muntura": "pasta",
    "color": "gris",
    "color_vidres": {
      "esquerra": "negre",
      "dreta": "negre"
    },
    "preu": 250.95}},{'ulleres':{
    "_id": "636534d3bed386276d078a5f",
    "marca": "ulleresUltra",
    "graduacio": {
      "esquerra": -0.5,
      "dreta": -0.5
    },
    "muntura": "metalica",
    "color": "negre",
    "color_vidres": {
      "esquerra": "transparent",
      "dreta": "transparent"
    },
    "preu": 295.99}}]
   },
   {'nom': 'Optica_Prima', 'adressa':{'carrer':'Diagonal', 'numero':'286', 'pis':'1', 'porta':'A', 'ciutat':'Barcelona',
   'codi_postal':'08024', 'pais':'España'}, 'telefon': '641069786', 'fax': '678145369', 'nif':'D145029', 
   'marques':[{'ulleres':{
    "_id": "636534d3bed386276d078a60",
    "marca": "Style80",
    "graduacio": {
      "esquerra": 1.5,
      "dreta": 1.75
    },
    "muntura": "pasta",
    "color": "vermell",
    "color_vidres": {
      "esquerra": "gris",
      "dreta": "gris"
    },
    "preu": 195.95}}]
   },
   {'nom': 'Vista_Plus', 'adressa':{'carrer':'Principal', 'numero':'82', 'pis':'2', 'porta':'C', 'ciutat':'Girona',
   'codi_postal':'17003', 'pais':'España'}, 'telefon': '972954123', 'fax': '972410348', 'nif':'B9810547','marques':[]}
  ]);


    db.createCollection("client", {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nom','adressa_postal','telefon','email','data_registre','amic_id','ulleres_comprades'],
          properties: {
            nom:{
              bsonType: 'string',
              description: 'Name is required'
            },
            adressa_postal: {
              bsonType: 'string'
            },
            telefon: {
              bsonType: 'string'
            },
            email: {
              bsonType: 'string'
            },
            data_registre: {
              bsonType: 'date'
            },
            amic_id: {
              bsonType: 'string'
            },
            ulleres_comprades:{
            bsonType: 'array',
            required: ['ulleres'],
            properties: {
            ulleres: {
              bsonType: 'object'
            }
          }
          }
            }
          }
        }
      }
    ); 
     
     
    db.client.insertMany([{'nom':'Maria','adressa_postal':'passeig St Joan 206, 1,2a, Barcelona',
    'telefon':'658014367','email':'maria@gmail.com','data_registre': new Date(),'amic_id':'',
    'ulleres_comprades':[{'ulleres':{
    "_id": "636534d3bed386276d078a60",
    "marca": "Style80",
    "graduacio": {
      "esquerra": 1.5,
      "dreta": 1.75
    },
    "muntura": "pasta",
    "color": "vermell",
    "color_vidres": {
      "esquerra": "gris",
      "dreta": "gris"
    },
    "preu": 195.95}},{'ulleres':{
    "_id": "636534d3bed386276d078a5f",
    "marca": "ulleresUltra",
    "graduacio": {
      "esquerra": -0.5,
      "dreta": -0.5
    },
    "muntura": "metalica",
    "color": "negre",
    "color_vidres": {
      "esquerra": "transparent",
      "dreta": "transparent"
    },
    "preu": 295.99}}] },
    {'nom':'Alex','adressa_postal':'c/Pamplona 127, 2,3a, Barcelona','telefon':'671504983',
    'email':'alex@gmail.com','data_registre': new Date(),'amic_id':'',
    'ulleres_comprades':[{'ulleres':{
    "_id": "636534d3bed386276d078a5e",
    "marca": "HarryPotter",
    "graduacio": {
      "esquerra": 0.5,
      "dreta": 0.75
    },
    "muntura": "pasta",
    "color": "gris",
    "color_vidres": {
      "esquerra": "negre",
      "dreta": "negre"
    },
    "preu": 250.95}}]}]);

    

