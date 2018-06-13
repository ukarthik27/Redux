export const completeItem = (item) => {
    console.log("completed");
    return {
        type: 'ITEM_COMPLETED',
        payload: item
    }
};