
export default function (state = [], action) {
    switch (action.type) {
        case 'ITEM_ADDED':
            var arr = [...state];
            arr.push({
                item_name: action.payload,
                isCompleted: false,
                isEdit : false
            })
            return arr;
            break;
        case 'ITEM_REMOVE':
            var arr = [...state];
            arr.forEach((i) => {
                if (i.item_name == action.payload) {
                    arr.splice(arr.indexOf(i), 1)
                }
            })

            return arr;
            break;
        case 'ITEM_COMPLETED':
            var arr = [...state];
            arr.forEach((i) => {
                if (i.item_name === action.payload) {
                    i.isCompleted = i.isCompleted == false ? true : false
                    console.log(i.item_name, i.isCompleted)
                }
            })
            return arr;
            break;
        case 'ITEM_EDIT':
            var arr = [...state];
            arr.forEach((i) => {
                if (i.item_name === action.old_payload) {
                    i.item_name = action.new_payload
                    i.isCompleted = action.completed_payload
                    
                    console.log(i.item_name)
                }
            })
            return arr;
            break;
    }
    return state;
}