    
    💻  Fonctionnalités :

    🔐 Authentification JWT
    👤 Gestion des utilisateurs et controller
    📦 Gestion des stocks de gaz
    🧾 Création / modification d'une livraison
    🚚 Suivi des livraisons

---------------------------------------------------------------------------------------------------------------------
🛠️ Technologies utilisées

Technologie	et Rôle
Node.js	 Environnement JavaScript backend
Express.js	 Framework web léger pour API REST
MongoDB + Mongoose	 Base de données NoSQL + ODM
JSON Web Token	 Authentification sécurisée
Nodemon	  Rechargement automatique en dev
---------------------------------------------------------------------------------------------------------------------
⚙️ Installation & Lancement

https://github.com/Raumance/Gaz_delivery/tree/master

cd Gaz_Delivery

# TRAM POUR INSTALLER les DEPENDANCES dans le Terminal: npm install

# TRAM POUR LANCER LE PROJET: npm run dev

# L'API sera accessible à l'adresse :
# http://localhost:3000

---------------------------------------------------------------------------------------------------------------------

📚 Documentation API

Base URL: http://localhost:5000/api

🔐 Middleware liés à l'authentification
Middleware	         |            Description
protect	             |           Protège les routes. Vérifie et décode le token JWT. Autorise aussi l'inscription du tout premier utilisateur sans authentification.
isAdmin	             |            Vérifie que l'utilisateur est un administrateur.
restrictTo(...roles) |	         Permet d’autoriser l’accès à certaines routes uniquement à certains rôles définis.

---------------------------------------------------------------------------------------------------------------------

# L'utilisateur doit utiliser "POSTMAN" pour envoyer des requêtes HTTP (GET, POST, PUT, DELETE, etc.)

📌 Authentification

Description: Crée un nouvel utilisateur. Le premier utilisateur créé devient administrateur automatiquement. Ensuite, seuls les admins peuvent en créer d'autres.

Protection: Ouvert sans token si aucun utilisateur n'existe. Protégé par protect ensuite.

Corps de la requête:

   TRAM POUR : USERS ====> utilisateur(l'utilisateur se connecte)

 Requete [POST] ==> http://localhost:3000/auth/login
Corps de la requête:

{
  "username": "admin",
  "password": "1234"
}

Réponse réussie:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVWlkIjoiYzVhZmI4N2YtNzQyYi00NWMwLWEzMjAtNzA5ZDU3NzM0YWNhIiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0OTM3NDY1NCwiZXhwIjoxNzQ5Mzc4MjU0fQ.Ql7QlNI6Va6IoqKV3DYwnbsF2-ZobrfXFQLXjKuQ6YM",
    "user": {
        "userUid": "c5afb87f-742b-45c0-a320-709d57734aca",
        "username": "admin",
        "role": "ADMIN"
    }
}

Erreur possible:

401: ["error": "Invalid username or password"]


---------------------------------------------------------------------------------------------------------------------
🚛 CHAUFFEURS

Description: Ajouter un nouveau chauffeurs.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

   TRAM POUR :  DRIVER  ====>  CHAUFFEUR

     Requete [POST] ==>  http://localhost:3000/api/drivers/create-driver

  {
    "name": "ASSONDI Diallo",
    "phoneNumber": "+24161234562",
    "drivingLicense": "DL-005",
  }

  Réponse réussie:

  {
    "name": "ASSONDI Diallo",
    "phoneNumber": "+24161234562",
    "drivingLicense": "DL-005",
    "salary": 0,
    "createdAt": "2025-06-08T10:18:07.595Z",
    "updatedAt": "2025-06-08T10:18:07.595Z"
  }

  Erreurs possibles:
  500 : {"error": "Name, phoneNumber, and drivingLicense are required."}
    
    TRAM POUR RECUPERER TOUS LES CHAUFFEURS

      Requete [GET] ==> http://localhost:3000/api/drivers/get-all-drivers

      Description: Récupérer la liste de tous les camions.
      Accès: Tous les utilisateurs connectés (admin, controller).

      Headers:

        Authorization: Bearer <token>

      Réponse réussie:
        [
    {
        "driverUid": "574c96cf-802f-4060-85d0-618c8543310f",
        "name": "PAUL ASAPH",
        "phoneNumber": "0700000001",
        "drivingLicense": "GA-12345",
        "salary": 0,
        "createdAt": "2025-06-08T10:00:02.277Z",
        "updatedAt": "2025-06-08T10:00:02.277Z"
    },
    {
        "driverUid": "9555e76a-2f9c-4014-a77a-f6d650804f2e",
        "name": "MAMADOU Pharelle",
        "phoneNumber": "0700000002",
        "drivingLicense": "GA-23456",
        "salary": 0,
        "createdAt": "2025-06-08T10:00:02.285Z",
        "updatedAt": "2025-06-08T10:00:02.285Z"
    },
    {
        "driverUid": "9d6b1884-45e9-4863-bcd2-0c7fb3b2e63f",
        "name": "kOUMBA Grace",
        "phoneNumber": "0700000003",
        "drivingLicense": "GA-34567",
        "salary": 0,
        "createdAt": "2025-06-08T10:00:02.287Z",
        "updatedAt": "2025-06-08T10:00:02.287Z"
    },
    {
        "driverUid": "f0bd584d-a8ee-441b-b83a-2eb83b499242",
        "name": "AKELE Constant",
        "phoneNumber": "0700000004",
        "drivingLicense": "GA-45678",
        "salary": 0,
        "createdAt": "2025-06-08T10:00:02.287Z",
        "updatedAt": "2025-06-08T10:00:02.287Z"
    },
    {
        "driverUid": "fbe9f84b-cf26-4240-a5cf-67933b4533f2",
        "name": "ASHBORNE",
        "phoneNumber": "0700000005",
        "drivingLicense": "GA-56789",
        "salary": 0,
        "createdAt": "2025-06-08T10:00:02.287Z",
        "updatedAt": "2025-06-08T10:00:02.287Z"
    }
  ]

  Erreurs possibles:
  404: <!DOCTYPE html>
        <html lang="en">

          <head>
	          <meta charset="utf-8">
	          <title>Error</title>
          </head>

          <body>
	          <pre>Cannot GET /api/drivers/get-all-driver</pre>
          </body>

        </html>



---------------------------------------------------------------------------------------------------------------------
BOUTEILLES

Description: Ajouter plusieurs bouteilles.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

TRAM pour creer plusieurs bouteilles de gaz 

Requete [POST] ==> http://localhost:3000/api/bottles/create-multiple-bottles

Corps de la requête:

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

Réponse réussie:

[
    {
        "bottleUid": "282e6811-5556-47e8-8917-15821efb7875",
        "reference": "B-123",
        "status": "full",
        "size": "12kg",
        "gasType": "Propane",
        "createdAt": "2025-06-08T10:27:50.385Z",
        "updatedAt": "2025-06-08T10:27:50.385Z"
    },
    {
        "bottleUid": "01240358-6618-4266-b443-56b4ee79302a",
        "reference": "B-124",
        "status": "empty",
        "size": "6kg",
        "gasType": "Butane",
        "createdAt": "2025-06-08T10:27:50.385Z",
        "updatedAt": "2025-06-08T10:27:50.385Z"
    }
]

Erreurs possibles:
500: {"error": "Bottle with reference B-123 already exists."}
500: Erreur serveur


Requete [POST] ==> http://localhost:3000/api/bottles/create-bottle

Description: Ajouter un nouvelle bouteille.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

  Corps de la requête:
  {
    "reference": "B-129",
    "size": "12kg",
    "gasType": "Propane",
    "status": "full"
  }

  Réponse réussie:

  {
    "bottleUid": "800530eb-bb18-478f-927e-776941813726",
    "reference": "B-129",
    "status": "full",
    "size": "12kg",
    "gasType": "Propane",
    "createdAt": "2025-06-08T10:33:53.082Z",
    "updatedAt": "2025-06-08T10:33:53.082Z"
  }

  Erreurs possibles:
  5000: {"error": "Bottle validation failed: size: Path `size` is required."}
  500: Erreur serveur

---------------------------------------------------------------------------------------------------------------------


TRAM POUR :  TRUCK  ====>  CAMION

Description: Ajouter plusieurs camions.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

  Requete [POST] ==>   http://localhost:3000/api/trucks/create-multiple-trucks

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

Réponse réussie:

[
    {
        "truckUid": "d9476846-c713-400b-a14d-ee71e43ac783",
        "brand": "MAN",
        "model": "TGX",
        "licensePlate": "TRUCK-011",
        "capacity": 130,
        "createdAt": "2025-06-08T10:39:33.733Z",
        "updatedAt": "2025-06-08T10:39:33.733Z"
    },
    {
        "truckUid": "709d8992-dd3e-4386-bc00-4b6cacb6a48b",
        "brand": "Volvo",
        "model": "FH",
        "licensePlate": "TRUCK-012",
        "capacity": 120,
        "createdAt": "2025-06-08T10:39:33.733Z",
        "updatedAt": "2025-06-08T10:39:33.733Z"
    },
    {
        "truckUid": "cabf0cbf-2353-4ba7-b079-ca1405fe28dc",
        "brand": "DAF",
        "model": "XF",
        "licensePlate": "TRUCK-013",
        "capacity": 125,
        "createdAt": "2025-06-08T10:39:33.733Z",
        "updatedAt": "2025-06-08T10:39:33.733Z"
    }
]

Erreurs possibles:
400: "Truck with licensePlate TRUCK-011 already exists."
500: Erreur serveur


Requete [POST] ==>   http://localhost:3000/api/trucks/create-truck

Description: Ajouter un camion.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

Corps de la requête:

{
  "brand": "Mercedes",
  "model": "Actros",
  "licensePlate": "TRUCK-010",
  "capacity": 100
}

Réponse réussie:

{
    "truckUid": "4a0a4e85-6450-49bd-982d-8a60cf328226",
    "brand": "Mercedes",
    "model": "Actros",
    "licensePlate": "TRUCK-010",
    "capacity": 100,
    "createdAt": "2025-06-08T10:42:44.325Z",
    "updatedAt": "2025-06-08T10:42:44.325Z"
}

Erreurs possibles:
400: "Truck with licensePlate TRUCK-010 already exists.
500: Erreur serveur
-----------------------------------------------------------------------------------------

TRAM POUR :  DELIVERY  ====>  LIVRAISON

Description: Ajouter plusieurs livraisons.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

Requete [POST] ==> : http://localhost:3000/api/deliveries/create-delivery

Corps de la requête:

{
  "truckUid": "080ef95c-a7e0-4205-bd10-9ea1bb484cfb",
  "driverUid": "986cb125-1f6e-4914-970e-e7aba97be43e",
  "customerUid": "6f090817-255e-45fe-835b-67028870e221",
  "bottleUids": ["7fdc1863-77c0-4306-b010-552a8f16e1db"]
}

Réponse réussie:

{
    "deliveryUid": "c1e3b304-20a4-4f89-a742-13349df71bb9",
    "date": "2025-06-08T10:48:02.779Z",
    "customer": {
        "customerUid": "6f090817-255e-45fe-835b-67028870e221",
        "name": "Cyraiana",
        "phoneNumber": "077010100",
        "customerType": "PARTICULIER",
        "createdAt": "2025-06-08T10:36:35.261Z",
        "updatedAt": "2025-06-08T10:36:35.261Z"
    },
    "truck": {
        "truckUid": "080ef95c-a7e0-4205-bd10-9ea1bb484cfb",
        "brand": "Mercedes",
        "model": "Actros",
        "licensePlate": "TRUCK-001",
        "capacity": 100,
        "createdAt": "2025-06-08T10:36:35.252Z",
        "updatedAt": "2025-06-08T10:36:35.252Z"
    },
    "driver": {
        "driverUid": "986cb125-1f6e-4914-970e-e7aba97be43e",
        "name": "PAUL ASAPH",
        "phoneNumber": "0700000001",
        "drivingLicense": "GA-12345",
        "salary": 0,
        "createdAt": "2025-06-08T10:36:35.223Z",
        "updatedAt": "2025-06-08T10:36:35.223Z"
    },
    "status": "INPROGRESS",
    "createdAt": "2025-06-08T10:48:02.781Z",
    "updatedAt": "2025-06-08T10:48:02.781Z"
}

Erreurs possibles:
400: Customer with customerUid:  9a2234c1-35fe-40bb-b35b-12be2def229a no exists.
500: Erreur serveur

TRAM pour recupere toutes les livraisons:


Requete [GET] ==>  http://localhost:3000/api/deliveries/get-all-deliveries

Réponse réussie:

[
    {
        "deliveryUid": "c1e3b304-20a4-4f89-a742-13349df71bb9",
        "date": "2025-06-08T10:48:02.779Z",
        "customer": {
            "customerUid": "6f090817-255e-45fe-835b-67028870e221",
            "name": "Cyraiana",
            "phoneNumber": "077010100",
            "customerType": "PARTICULIER",
            "createdAt": "2025-06-08T10:36:35.261Z",
            "updatedAt": "2025-06-08T10:36:35.261Z"
        },
        "truck": {
            "truckUid": "080ef95c-a7e0-4205-bd10-9ea1bb484cfb",
            "brand": "Mercedes",
            "model": "Actros",
            "licensePlate": "TRUCK-001",
            "capacity": 100,
            "createdAt": "2025-06-08T10:36:35.252Z",
            "updatedAt": "2025-06-08T10:36:35.252Z"
        },
        "driver": {
            "driverUid": "986cb125-1f6e-4914-970e-e7aba97be43e",
            "name": "PAUL ASAPH",
            "phoneNumber": "0700000001",
            "drivingLicense": "GA-12345",
            "salary": 0,
            "createdAt": "2025-06-08T10:36:35.223Z",
            "updatedAt": "2025-06-08T10:36:35.223Z"
        },
        "status": "INPROGRESS",
        "createdAt": "2025-06-08T10:48:02.781Z",
        "updatedAt": "2025-06-08T10:48:02.781Z"
    }
]


TRAM pour annuler une livraisons:

Description: Annule la livraisons.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

Requete [PUT] ==>  http://localhost:3000/api/deliveries/cancel/{UUID}


Réponse réussie:

{
    "deliveryUid": "c1e3b304-20a4-4f89-a742-13349df71bb9",
    "date": "2025-06-08T10:48:02.779Z",
    "customer": {
        "customerUid": "6f090817-255e-45fe-835b-67028870e221",
        "name": "Cyraiana",
        "phoneNumber": "077010100",
        "customerType": "PARTICULIER",
        "createdAt": "2025-06-08T10:36:35.261Z",
        "updatedAt": "2025-06-08T10:36:35.261Z"
    },
    "truck": {
        "truckUid": "080ef95c-a7e0-4205-bd10-9ea1bb484cfb",
        "brand": "Mercedes",
        "model": "Actros",
        "licensePlate": "TRUCK-001",
        "capacity": 100,
        "createdAt": "2025-06-08T10:36:35.252Z",
        "updatedAt": "2025-06-08T10:36:35.252Z"
    },
    "driver": {
        "driverUid": "986cb125-1f6e-4914-970e-e7aba97be43e",
        "name": "PAUL ASAPH",
        "phoneNumber": "0700000001",
        "drivingLicense": "GA-12345",
        "createdAt": "2025-06-08T10:36:35.223Z",
        "updatedAt": "2025-06-08T10:36:35.223Z"
    },
    "status": "CANCELLED",
    "createdAt": "2025-06-08T10:48:02.781Z",
    "updatedAt": "2025-06-08T10:51:52.793Z"
}


TRAM pour une livraisons complet:

Description: COMFIRME la livraisons.
Accès: Admin uniquement.
Headers:
 
  Authorization: Bearer <token>
  Content-Type: application/json

Requete [PUT] ==>  http://localhost:3000/api/deliveries/complete-delivery/{UUID}

{
    "deliveryUid": "c1e3b304-20a4-4f89-a742-13349df71bb9",
    "date": "2025-06-08T10:48:02.779Z",
    "customer": {
        "customerUid": "6f090817-255e-45fe-835b-67028870e221",
        "name": "Cyraiana",
        "phoneNumber": "077010100",
        "customerType": "PARTICULIER",
        "createdAt": "2025-06-08T10:36:35.261Z",
        "updatedAt": "2025-06-08T10:36:35.261Z"
    },
    "truck": {
        "truckUid": "080ef95c-a7e0-4205-bd10-9ea1bb484cfb",
        "brand": "Mercedes",
        "model": "Actros",
        "licensePlate": "TRUCK-001",
        "capacity": 100,
        "createdAt": "2025-06-08T10:36:35.252Z",
        "updatedAt": "2025-06-08T10:36:35.252Z"
    },
    "driver": {
        "driverUid": "986cb125-1f6e-4914-970e-e7aba97be43e",
        "name": "PAUL ASAPH",
        "phoneNumber": "0700000001",
        "drivingLicense": "GA-12345",
        "salary": 500,
        "createdAt": "2025-06-08T10:36:35.223Z",
        "updatedAt": "2025-06-08T10:53:37.701Z",
        "deliveredBottleUids": [
            "7fdc1863-77c0-4306-b010-552a8f16e1db"
        ]
    },
    "status": "COMPLETED",
    "createdAt": "2025-06-08T10:48:02.781Z",
    "updatedAt": "2025-06-08T10:53:37.646Z"
}

-----------------------------------------------------------------------------------------

Attention: Dans ce projet il n'est plus neccessaire de faire le delete coté "node js"
