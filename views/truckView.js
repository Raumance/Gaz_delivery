


function truckView(data) {
    return {
        truckUid: data.truckUid,
        brand: data.brand,
        model: data.model,
        licensePlate: data.licensePlate,
        capacity: data.capacity,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

module.exports = { truckView };