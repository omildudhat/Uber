export const initialState = {
    basket : []
};

export const getTotal = (dish) => {
    dish?.reduce((amount,item) => item.price + amount, 0);
}

function reducer(state = initialState,action) {
    switch(action.type) {
        case "ADD_TO_BASKET" :
            return {
                ...state,
                basket: [...state.basket, action.payload],
            };
        
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: [],
            }

        case "REMOVE_FROM_BASKET":
            let newBasket = [...state.basket];
            const index = state.basket.findIndex(
                (basketItem) => basketItem.dishId == action.id.id
                
            );
            if(index >= 0) {
                newBasket.splice(index,1);
            } else {
                console.log("Can't remove the product");
            }
            return {...state, basket:newBasket};

        default:
            return state;
    }
}


export default reducer;