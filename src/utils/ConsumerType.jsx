export const ConsumerType = {
    0: "Personal",
    1: "Business",
    2: "Industries"
};


export const getConsumerName = (value) => {
    return ConsumerType[value] || "Unknown";
};