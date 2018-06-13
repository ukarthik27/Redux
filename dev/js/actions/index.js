//var arr = [];
export const AddItem = (item) => {
    console.log("added");
    return {
        type: 'ITEM_ADDED',
        payload: item
    }
};