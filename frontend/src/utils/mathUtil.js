export const roundDecimal = (number) => {
    return Math.round(number * 100) / 100;
};

export const calculateAllocation = (income, percentage) => {
    if (percentage) {
        if (!isNaN(percentage)) {
            return roundDecimal(income * (percentage / 100));
        }
    }
    else {
        return "";
    }
};