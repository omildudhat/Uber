const initialState = {
    resturant:{},
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "LOGIN_RESTURANT":
            return { ...state, resturant: action.payload};
        case "LOGOUT_RESTURANT":
            return { ...state, resturant:null}
        default:
            return state;
    }
};

export default reducer;