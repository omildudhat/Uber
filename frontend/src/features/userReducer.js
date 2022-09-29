const initialState = {
    user:{},
    errMsg : "",
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case "LOGIN_REQUEST" :
            console.log('login req');
            return state;
        case "LOGIN_SUCCESS":
            console.log('login success');
            return { ...state, user: action.payload};
        case "LOGIN_FAILURE":
            console.log('login failure');
            return {...state, errMsg : action.payload}
        case "LOGOUT":
            return { ...state, user:null}
        default:
            return state;
    }
};

export default reducer;