

function customerView(data) {
    return {
        customerUid: data.customerUid,
        name: data.name,
        phoneNumber: data.phoneNumber,
        customerType: data.customerType,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

module.exports = { customerView };