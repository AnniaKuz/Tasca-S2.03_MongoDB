use('exercici2_pizzeria');

db.createCollection("provincia" ,{
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['provincia','ciutats'],
      properties: {
        provincia: {
          bsonType: 'string'
        },
        ciutats: {
          bsonType: 'array',
          required: ['ciutat_id','nom'],
          properties: {
            ciutat_id: {
              bsonType: 'objectId'
            },
            nom: {
              bsonType: 'string'
            }
          }
        }
      }
    }
  }
});

db.provincia.insertMany([{'provincia':'Barcelona','ciutats':[{'ciutat_id': ObjectId(),'nom':'Barcelona'},
{'ciutat_id': ObjectId(),'nom':'Rubí'},{'ciutat_id': ObjectId(),'nom':'Badalona'}]},
{'provincia':'Barcelona','ciutats':[{'ciutat_id': ObjectId(),'nom':'Girona'},
{'ciutat_id': ObjectId(),'nom':'Lloret de mar'}]}]);




db.createCollection("client", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nom','cognoms','adressa','telefono'],
      properties:{
        nom: {
          bsonType: 'string'
        },
        cognoms:{
          bsonType: 'string'
        },
        adressa: {
            bsonType: 'object',
            properties: {
              carrer: {
                bsonType: 'string',
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
              codi_postal: {
                bsonType: 'string'
              },
              ciutat: {
                bsonType: 'object'
              },
              provincia: {
                bsonType: 'string'
              }
      }
    },
    telefono: {
      bsonType: 'string'
    }
  }
}}});

db.client.insertMany([
  {'nom':'Carla', 'cognoms':'Muñoz Pedrera','adressa':{'carrer':'America','numero':'167','pis':'','porta':'',
  'codi_postal':'08022','ciutat':{
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },'provincia':'Barcelona'},'telefono':'697204513'},
  {'nom':'Xavier', 'cognoms':'Fernandez Sanchez','adressa':{'carrer':'Napols','numero':'251','pis':'3','porta':'C',
  'codi_postal':'08019','ciutat':{
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },'provincia':'Barcelona'},'telefono':'610547834'},
  {'nom':'Sonia', 'cognoms':'Mas Martin','adressa':{'carrer':'Mallorca','numero':'279','pis':'2','porta':'A',
  'codi_postal':'08021','ciutat':{
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },'provincia':'Barcelona'},'telefono':'617800649'}
]);


db.createCollection("botiga", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['adressa','codi_postal','localitat'],
      properties: {
        adressa: {
          bsonType: 'string'
        },
        codi_postal: {
          bsonType: 'string'
        },
        localitat: {
          bsonType: 'object'
        },
        provincia: {
          bsonType: 'string'
        }
      }
    }
  }
});

db.botiga.insertOne({'adressa':'c/Marina 208','codi_postal':'08023','localitat':{
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      }, 'provincia':'Barcelona'});
db.botiga.find(); 


db.createCollection("empleat" ,{
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nom','cognoms','nif','telefon','posicio','botiga_id'],
      properties: {
        nom: {
          bsonType: 'string'
        },
        cognoms: {
          bsonType: 'string'
        },
        nif: {
          bsonType: 'string'
        },
        telefono: {
          bsonType: 'string'
        },
        posicio: {
          enum: ['repartidor','cuiner']
        },
        botiga_id:{
          bsonType: 'object'
        }
      }
    }
  }
});

db.empleat.insertOne({'nom':'Christian','cognoms':'Blasco Casals','nif':'8415324H',
'telefon':'684001547','posicio':'repartidor','botiga_id':{
    "_id": "636519fe8311be39f6eec33d",
    "adressa": "c/Marina 208",
    "codi_postal": "08023",
    "localitat": {
      "ciutat_id": "6365189b779044b7d31bd775",
      "nom": "Barcelona"
    },
    "provincia": "Barcelona"
  }});



db.createCollection("categoria",{
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nom'],
      properties:{
        nom: {
          bsonType: 'string'
        }
      }
    }
  }
});

db.categoria.insertMany([{'nom':'Beguda'},{'nom':'Hamburguess'},{'nom':'Pizza'}]);


db.createCollection("producte", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nom','descripcio','preu','imatge'],
      properties:{
        nom: {
          bsonType: 'string'
        },
        descripcio: {
          bsonType: 'string'
        },
        preu: {
          bsonType: 'number'
        },
        imatge: {
          bsonType: 'string'
        }
      }
    }
  }
});


db.producte.insertMany([{'nom':'Cola','descripcio':'refresc','preu':2.2,'categoria': {
    "_id": "63651aef91b2f8b82df84e37",
    "nom": "Beguda"
  }, 'imatge':''},
  {'nom':'Aigua','descripcio':'1L','preu':1.8,'categoria': {
    "_id": "63651aef91b2f8b82df84e37",
    "nom": "Beguda"
  }, 'imatge':''},
  {'nom':'Prosciutto','descripcio':'pizza normal','preu':10.2,'categoria':  {
    "_id": "63651aef91b2f8b82df84e39",
    "nom": "Pizza"
  }, 'imatge':''},
  {'nom':'4Formatges','descripcio':' ','preu':12.5,'categoria': {
    "_id": "63651aef91b2f8b82df84e39",
    "nom": "Pizza"
  }, 'imatge':''},
  {'nom':'Burguer Americana','descripcio':'completa amb formatge','preu':11.5,'categoria': {
    "_id": "63651aef91b2f8b82df84e38",
    "nom": "Hamburguess"
  },'imatge':''},
  {'nom':'Vi Blanc','descripcio':'botella de vi blanc DO Alella','preu':12.0,'imatge':''}]);


db.createCollection("comanda", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['data','tipus','preu_total','quantitat_prod','client_id','botiga_id', 'empleat_id','hora_reparto'],
      properties:{
        data: {
          bsonType: 'date'
        },
        tipus:{
          enum: ['domicili','recollida']
        },
        preu_total: {
          bsonType: 'number'
        },
        quantitat_prod: {
          bsonType: 'int'
        },
        client_id: {
        bsonType: 'object'
        },
       botiga_id: {
        bsonType: 'object'
        },
       empleat_id: {
        bsonType: 'object'
        },
        hora_reparto: {
          bsonType: 'timestamp'
        }
    }
  }
}});




db.comanda.insertMany([{'data': new Date(),'tipus':'domicili','preu_total':14.8,
'quantitat_prod':3, 'client_id':{
    "_id": "6365195d4c0f37c91f95bb28",
    "nom": "Carla",
    "cognoms": "Muñoz Pedrera",
    "adressa": {
      "carrer": "America",
      "numero": "167",
      "pis": "",
      "porta": "",
      "codi_postal": "08022",
      "ciutat": {
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },
      "provincia": "Barcelona"
    },
    "telefono": "697204513"
  },'botiga_id':{
    "_id": "636519fe8311be39f6eec33d",
    "adressa": "c/Marina 208",
    "codi_postal": "08023",
    "localitat": {
      "ciutat_id": "6365189b779044b7d31bd775",
      "nom": "Barcelona"
    },
    "provincia": "Barcelona"
  }, 'empleat_id':{
    "_id": "63651a89c3e91c5fb4a1eaf0",
    "nom": "Christian",
    "cognoms": "Blasco Casals",
    "nif": "8415324H",
    "telefon": "684001547",
    "posicio": "repartidor",
    "botiga_id": {
      "_id": "636519fe8311be39f6eec33d",
      "adressa": "c/Marina 208",
      "codi_postal": "08023",
      "localitat": {
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },
      "provincia": "Barcelona"
    }
  }, 'hora_reparto':new Timestamp()},
{'data': new Date(),'tipus':'domicili','preu_total':38.8,
'quantitat_prod':4, 'client_id':{
    "_id": "6365195d4c0f37c91f95bb29",
    "nom": "Xavier",
    "cognoms": "Fernandez Sanchez",
    "adressa": {
      "carrer": "Napols",
      "numero": "251",
      "pis": "3",
      "porta": "C",
      "codi_postal": "08019",
      "ciutat": {
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },
      "provincia": "Barcelona"
    },
    "telefono": "610547834"
  },'botiga_id':{
    "_id": "636519fe8311be39f6eec33d",
    "adressa": "c/Marina 208",
    "codi_postal": "08023",
    "localitat": {
      "ciutat_id": "6365189b779044b7d31bd775",
      "nom": "Barcelona"
    },
    "provincia": "Barcelona"
  }, 'empleat_id':{
    "_id": "63651a89c3e91c5fb4a1eaf0",
    "nom": "Christian",
    "cognoms": "Blasco Casals",
    "nif": "8415324H",
    "telefon": "684001547",
    "posicio": "repartidor",
    "botiga_id": {
      "_id": "636519fe8311be39f6eec33d",
      "adressa": "c/Marina 208",
      "codi_postal": "08023",
      "localitat": {
        "ciutat_id": "6365189b779044b7d31bd775",
        "nom": "Barcelona"
      },
      "provincia": "Barcelona"
    }
  }, 'hora_reparto':new Timestamp()}]);

 
db.createCollection("comandaprod", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['comanda','productes'],
      properties: {
        comanda: {
          bsonType: 'object'
        },
        productes: {
          bsonType: 'array',
          required: ['producte','quant_prod'],
          properties: {
            producte: {
              bsonType: 'object'
            },
            quant_prod: {
              bsonType: 'number'
            }
          }
        }
      }
    }
  }
});

db.comandaprod.insertMany([{'comanda':{"_id": "636522e12f706383e6998baf"}, 'productes':[{'producte':{
    "_id": "63651be057012f6db1447cc9",
    "nom": "Cola",
    "descripcio": "refresc",
    "preu": 2.2,
    "categoria": {
      "_id": "63651aef91b2f8b82df84e37",
      "nom": "Beguda"
    },
    "imatge": ""
  }, 'quant_prod': 2},{'producte':{
    "_id": "63651be057012f6db1447ccb",
    "nom": "Prosciutto",
    "descripcio": "pizza normal",
    "preu": 10.2,
    "categoria": {
      "_id": "63651aef91b2f8b82df84e39",
      "nom": "Pizza"
    },
    "imatge": ""
  }, 'quant_prod':1}]},
  {'comanda':{"_id": "636522e12f706383e6998bb0"}, 'productes':[{'producte':{
    "_id": "63651be057012f6db1447ccc",
    "nom": "4Formatges",
    "descripcio": " ",
    "preu": 12.5,
    "categoria": {
      "_id": "63651aef91b2f8b82df84e39",
      "nom": "Pizza"
    },
    "imatge": ""
  },'quant_prod':2},{'producte':{
    "_id": "63651be057012f6db1447cca",
    "nom": "Aigua",
    "descripcio": "1L",
    "preu": 1.8,
    "categoria": {
      "_id": "63651aef91b2f8b82df84e37",
      "nom": "Beguda"
    },
    "imatge": ""
  },'quant_prod':1},{'producte':{
    "_id": "63651be057012f6db1447cce",
    "nom": "Vi Blanc",
    "descripcio": "botella de vi blanc DO Alella",
    "preu": 12,
    "imatge": ""
  }, 'quant_prod':1}]}]);









