
const reducer =  (state, action) => {
    switch (action.type) {
        case 'JOINED': 
            return {
                ...state,
                joined: true, 
                userName: action.payload.obj.userName,
                id: action.payload.id
            };

            case 'UNJOINED': 
            return {
                ...state,
                joined: false, 
                users: [],
            };

            case 'SET_DATA':  
            return {
                ...state,
                users: action.payload,
            };

            case 'SET_USERS':  
            return {
                ...state,
                users: action.payload,
            };

        default:
            return state; //если ничего не передали то возвращает старое состояние
    }
}

export default reducer;