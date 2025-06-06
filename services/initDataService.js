const InitDataService = {
    getDriversData() {
        return [
            {
                name: "PAUL ASAPH",
                phoneNumber: "0700000001",
                drivingLicense: "GA-12345",
            },
            {
                name: "MAMADOU Pharelle",
                phoneNumber: "0700000002",
                drivingLicense: "GA-23456",
            },
            {
                name: "kOUMBA Grace",
                phoneNumber: "0700000003",
                drivingLicense: "GA-34567",
            },
            {
                name: "AKELE Constant",
                phoneNumber: "0700000004",
                drivingLicense: "GA-45678",
            },
            {
                name: "SONG Dolores",
                phoneNumber: "0700000005",
                drivingLicense: "GA-56789",
            },
        ];
    },

    getTrucksData() {
        return [
            {
                brand: "Mercedes",
                model: "Actros",
                licensePlate: "TRUCK-001",
                capacity: 100,
            },
            {
                brand: "Volvo",
                model: "FH",
                licensePlate: "TRUCK-002",
                capacity: 120,
            },
            {
                brand: "Scania",
                model: "R450",
                licensePlate: "TRUCK-003",
                capacity: 110,
            },
            {
                brand: "MAN",
                model: "TGX",
                licensePlate: "TRUCK-004",
                capacity: 130,
            },
            {
                brand: "DAF",
                model: "XF",
                licensePlate: "TRUCK-005",
                capacity: 125,
            },
        ];
    },

     getCustomersData() {
        return [
            {
                name: "Cyraiana",
                phoneNumber: "077010100",
                customerType: "PARTICULIER"
            },
            {
                name: "OSSAS IT GABON",
                phoneNumber: "061010100",
                customerType: "ORGANISATION"
            },
            {
                name: "Station du charbonnage(LBV)",
                phoneNumber: "065171717",
                customerType: "ORGANISATION"
            },
            {
                name: "ASSIDOU Dialo",
                phoneNumber: "062171718",
                customerType: "BOUTIQUIER"
            }
        ];
    },
};

module.exports = InitDataService;