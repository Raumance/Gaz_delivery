


function bottleView(data) {
    return {
        bottleUid: data.bottleUid,
        reference: data.reference,
        status: data.status,
        size: data.size,
        gasType: data.gasType,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

module.exports = { bottleView };
