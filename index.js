const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const deliveryRoutes = require('./routes/deliveryRoutes');
const bottleRoutes = require('./routes/bottleRoutes');
const driverRoutes = require('./routes/driverRoutes');
const truckRoutes = require('./routes/truckRoutes');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');

const Delivery = require('./models/Delivery');


const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger-output.json');


const initService = require('./services/initService');

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api/deliveries', deliveryRoutes);
app.use('/api/bottles', bottleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/customers', customerRoutes);
app.use('/auth', authRoutes);








// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Gas Delivery App API');
});

const PORT = process.env.PORT || 3000;



// 
// --------------------------------------------------------------------------

// Connect to MongoDB



mongoose.connect(process.env.MONGODB_URI)
.then(async () => {


    console.log('-------------------------------------');

    console.log('✅ Connected to MongoDB');

     console.log('-------------------------------------');

    await Delivery.deleteMany({});
    console.log("🗑️  All deliveries deleted.");

    console.log('-------------------------------------');
    // Initialisation des chauffeurs au démarrage
    await initService.initializeDrivers();

    console.log('-------------------------------------');
    // Initialisation des camions au démarrage
    await initService.initializeTrucks();

    console.log('-------------------------------------');
    // Initialisation des clients au démarrage
    await initService.initializeCustomers();

    console.log('-------------------------------------');
    // Initialisation des bouteilles au démarrage
    await initService.initializeBottles();

    console.log('-------------------------------------');
    // Initialisation des chauffeurs au démarrage
    await initService.initializeRoles();

    console.log('-------------------------------------');
    // Initialisation des chauffeurs au démarrage
    await initService.initializeUsers();

    console.log('-------------------------------------');
    // Démarrer le serveur seulement après initialisation
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});
