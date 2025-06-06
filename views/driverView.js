

function driverView(data) {
    return {
        driverUid: data.driverUid,
        name: data.name,
        phoneNumber: data.phoneNumber,
        drivingLicense: data.drivingLicense,
        salary: data.salary,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

module.exports = { driverView };