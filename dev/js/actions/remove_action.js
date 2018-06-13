
export const removeItem = (item) => {
    console.log("removed");
    return {
        type: 'ITEM_REMOVE',
        payload: item
    }
};