
---------------------------------------------------------------------------------------------------------------------

   
     📦 Résumé du cahier des charges

    Contexte :

    Une entreprise vend en gros des bouteilles de gaz (pleines et vides). Elle veut :
    ✅ Une application mobile pour les contrôleurs qui suivent les camions et les chauffeurs.
    ✅ Une application web pour la direction qui suit les livraisons, les stocks, les performances et les salaires.
        
        
---------------------------------------------------------------------------------------------------------------------   

🎯 Objectifs principaux :

    Suivre le nombre de bouteilles (pleines/vides) au départ et au retour.

    Automatiser le calcul des salaires des chauffeurs selon les ventes.

    Générer des tableaux de bord pour visualiser les performances, les ventes, les stocks.

    Assurer une gestion centralisée et précise via l’interface web.


---------------------------------------------------------------------------------------------------------------------   
   
    
    💻  Fonctionnalités côté web (direction) :

    Suivre toutes les activités enregistrées par les contrôleurs.

    Visualiser les flux de bouteilles par camion et chauffeur.

    Calculer les salaires selon les performances (bouteilles vides au retour).

    Suivre les stocks (globaux, pleins, vides).

    Générer des rapports et des tableaux de bord par période.


---------------------------------------------------------------------------------------------------------------------

🏗 Traduction des entités en français :


    Driver	---------> Chauffeur

    Truck	---------> Camion

    Controller	---------> Contrôleur

    Delivery	---------> Livraison / Mission (enregistrement)

    DriverSalary	---------> Salaire du chauffeur

    Stock	---------> Stock (global de bouteilles)

    StockMovement	---------> Mouvement de stock

    BottleType (enum)	---------> Type de bouteille (PLEINE, VIDE)

    MovementType ---------> (enum)	Type de mouvement (ENTRÉE, SORTIE)


---------------------------------------------------------------------------------------------------------------------


📦 Structure des fichiers



    /models
        driver.js
        truck.js
        controller.js
        delivery.js
        driverSalary.js
        stock.js
        stockMovement.js

    /services
        driverService.js
        truckService.js
        controllerService.js
        deliveryService.js
        driverSalaryService.js
        stockService.js
        stockMovementService.js

    /routes
        driverRoutes.js
        truckRoutes.js
        controllerRoutes.js
        deliveryRoutes.js
        driverSalaryRoutes.js
        stockRoutes.js
        stockMovementRoutes.js


---------------------------------------------------------------------------------------------------------------------


    🚀 Étape 1 : Créer le dossier du projet

    mkdir gas-delivery-app

    cd gas-delivery-app

---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 2 : Initialiser un projet Node.js

    npm init -y

    Cela crée un fichier package.json.

---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 3 : Installer les dépendances


    npm install express mongoose dotenv

    ✅ express → pour créer l’API

    ✅ mongoose → pour interagir avec MongoDB

    ✅ dotenv → pour gérer les variables d’environnement (comme l’URL MongoDB)

    Pour les outils de développement :

    npm install --save-dev nodemon

    ✅ nodemon → pour recharger automatiquement l’app quand tu modifies du code


---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 4 : Créer la structure des dossiers

    mkdir models routes services config

    touch index.js

---------------------------------------------------------------------------------------------------------------------

🚀 Étape 5 : Configurer Express et MongoDB

    Dans index.js

    const express = require('express');
    const mongoose = require('mongoose');
    require('dotenv').config();

    const app = express();
    app.use(express.json());

    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

    // Basic route
    app.get('/', (req, res) => {
        res.send('Welcome to the Gas Delivery App API');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });



---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 6 : Créer le fichier .env

    Dans la racine du projet, crée un fichier .env :

    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/gas-delivery


---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 7 : Ajouter un script nodemon

    Dans package.json, ajoute dans "scripts" :

    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }

---------------------------------------------------------------------------------------------------------------------

    🚀 Étape 8 : Lancer le serveur

    npm run dev

---------------------------------------------------------------------------------------------------------------------


    ✅ Si tout est bien configuré, tu verras :


    ✅ Connected to MongoDB  

    🚀 Server running on port 3000


---------------------------------------------------------------------------------------------------------------------

✅ Étape 1 : Installer la lib uuid

Dans ton projet Node.js, exécute :


npm install uuid --save

---------------------------------------------------------------------------------------------------------------------

Étapes minimalistes pour une interface Swagger REST

Installer les paquets si ce n’est pas fait :


npm install swagger-autogen swagger-ui-express --save

Lance pour swagger:  node config/swagger.js

http://localhost:3000/api-docs

---------------------------------------------------------------------------------------------------------------------

   TRAM POUR : USERS ====> utilisateur(l'utilisateur se connecte)

POST http://localhost:3000/auth/login

{
  "username": "",
  "password": ""
}


   TRAM POUR :  DRIVER  ====>  CHAUFFEUR

POST  http://localhost:3000/api/drivers/create-driver

TRAM POUR CREER UN CHAUFFEUR 

{
    "name": "ASSONDI Diallo",
    "phoneNumber": "+24161234562",
    "drivingLicense": "DL-005",
    
}


TRAM POUR CREER UN CHAUFFEUR

GET  http://localhost:3000/api/drivers/get-all-drivers

Il va directement ressortir tous les chauffeurs


---------------------------------------------------------------------------------------------------------------------

TRAM POUR :  BOTTLE  ====>  BOUTEILLE DE GAZ

TRAM pour creer plusieurs bouteilles de gaz 

POST  http://localhost:3000/api/bottles/create-multiple-bottles

{
  "bottles": [
    {
      "reference": "B-123",
      "size": "12kg",
      "gasType": "Propane",
      "status": "full"
    },
    {
      "reference": "B-124",
      "size": "6kg",
      "gasType": "Butane",
      "status": "empty"
    }
  ]
}


POST  http://localhost:3000/api/bottles/create-bottle

TRAM pour creer une seul bouteille 

{
  "reference": "B-129",
  "size": "12kg",
  "gasType": "Propane",
  "status": "full"
}




---------------------------------------------------------------------------------------------------------------------


TRAM POUR :  TRUCK  ====>  CAMION

TRAM pour creer plusieurs camions

POST  http://localhost:3000/api/trucks/create-multiple-trucks

{
  "trucks": [
    {
        "brand": "MAN",
        "model": "TGX",
        "licensePlate": "TRUCK-011",
        "capacity": 130
    },
    {
        "brand": "Volvo",
        "model": "FH",
        "licensePlate": "TRUCK-012",
        "capacity": 120
    },
    {
        "brand": "DAF",
        "model": "XF",
        "licensePlate": "TRUCK-013",
        "capacity": 125
    }
  ]
}


POST  http://localhost:3000/api/trucks/create-truck

TRAM pour creer un camion


{
  "brand": "Mercedes",
  "model": "Actros",
  "licensePlate": "TRUCK-010",
  "capacity": 100
}



-----------------------------------------------------------------------------------------

TRAM POUR :  DELIVERY  ====>  LIVRAISON

TRAM pour creer une livraison:

POST : http://localhost:3000/api/deliveries/create-delivery

{
  "truckUid": "6f186185-7039-4879-afd8-d169ff4aaea9",
  "driverUid": "515ae9ab-0bcf-4f7b-87a1-fe021dc5c5d0",
   "customerUid": "a3a18bae-5b0e-4f6d-8b43-06b47e2ed5c1",
  "bottleUids": ["a8dcc5d4-cfbc-4a03-bc79-bd4c2447f9ca", "cb6196dc-bcb8-4060-9eac-3bfb6d50fdd6"]
}


TRAM pour recupere toutes les livraisons:

GET http://localhost:3000/api/deliveries/get-all-deliveries


TRAM pour annuler une livraisons:

PUT http://localhost:3000/api/deliveries/cancel/{UUID}

{
  "truckUid": "ee6bbf48-46f4-43fa-9e78-9e561967e64a",
  "driverUid": "ba0caed6-8edc-4876-a01e-75cedc35f020",
  "customerUid": "b57fb5be-b75d-4ca5-8ccb-b4e9e9b97717",
  "bottleUids": ["a1e9bec0-a9fd-4671-856f-e122ce202786"]
}



TRAM pour une livraisons complet:

PUT http://localhost:3000/api/deliveries/complete-delivery/{UUID}

{
  "truckUid": "8286d637-2382-4ff9-90be-d8a8898fff50",
  "driverUid": "ce2496c3-5b91-4084-b270-3db95e8f3e9c",
  "customerUid": "e935e305-92d5-4a9a-95c2-71cb4b56b74e",
  "bottleUids": ["c86b11fc-8313-400b-ba56-a16c20a8fb07", "fda33f1f-f45c-4d83-bd78-e203b42065c8"]
}



-----------------------------------------------------------------------------------------

Attention: Dans ce projet il n'est plus neccessaire de faire le delete coté "node js"
