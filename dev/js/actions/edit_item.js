export const editItem = (old_item,new_item,isCompleted) => {
    console.log("edit");
    return {
        type: 'ITEM_EDIT',
        old_payload: old_item,
        new_payload: new_item,
        completed_payload : isCompleted
    }
};