const { v4: uuidv4 } = require('uuid');

const gasTypes = [
    { name: "Butane", prefix: "BUT" },
    { name: "Propane", prefix: "PRO" },
    { name: "Methane", prefix: "MET" },
];

function getGasType(index) {
    return gasTypes[index % gasTypes.length];
}

function generateReference(prefix, number) {
    return `${prefix}-${String(number).padStart(3, "0")}`;
}

function getRandomSize() {
    const sizes = ["6kg", "12kg", "39kg"];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

function getRandomStatus() {
    const statuses = ["full", "empty", "damaged"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function generateBottles(number) {
    const bottles = [];
    for (let i = 0; i < number; i++) {
        const gasType = getGasType(i);
        const reference = generateReference(gasType.prefix, i + 1);
        bottles.push({
            reference: reference,
            status: getRandomStatus(),
            size: getRandomSize(),
            gasType: gasType.name,
            bottleUid: uuidv4(),
        });
    }
    return bottles;
}

module.exports = {
    generateBottles,
    gasTypes,
};
