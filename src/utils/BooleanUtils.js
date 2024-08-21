const tinyIntToBoolean = (value) => {
    return value !== 0;
};

const booleanToTinyInt = (value) => {
    if (value === "true") {
        return 1
    }

    return 0;
};

module.exports = {
    tinyIntToBoolean, 
    booleanToTinyInt 
}