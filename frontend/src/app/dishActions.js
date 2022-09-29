export function addToCart(payload){
    return{
        type: "ADD_TO_BASKET",
        payload
    }
}

export function removeFromCart(id) {
    return{
        type: "REMOVE_FROM_BASKET",
        id
    }
}

export function emptyBasket(){
    return{
        type: "EMPTY_BASKET"
    }
}