const tinyIntToBoolean = (value: number): boolean => {
    return value !== 0;
};

const booleanToTinyInt = (value: boolean | string): number => {
    if (value === "true" || value === true) {
        return 1;
    }

    return 0;
};

export {
    tinyIntToBoolean, 
    booleanToTinyInt 
};