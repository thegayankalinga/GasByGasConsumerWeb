export const ConsumerType = {
    0: "Personal",
    1: "Business",
    2: "Industries",
    3: "Admin",
    4: "Manager",
};


export const getConsumerName = (value) => {
    return ConsumerType[value] || "Unknown";
};