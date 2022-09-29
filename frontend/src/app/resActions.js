export function loginResturant(payload){
    return {
        type: "LOGIN_RESTURANT",
        payload
    }
}

export function logoutResturant() {
    return {
        type: "LOGOUT_RESTURANT"
    }
}