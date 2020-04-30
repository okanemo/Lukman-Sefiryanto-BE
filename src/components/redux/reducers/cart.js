const initialState = {
    carts: [],
    chart: [],
    total: 0
}
const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CART_FULFILLED':
            return {
                ...state,
                chart: action.payload.data
            }

        case 'POST_ORDER_FULFILLED':
            return {
                ...state
            }
        case 'POST_ORDER_PENDING':
            return {
                ...state
            }
        case 'POST_ORDER_REJECTED':
            return {
                ...state
            }
        case 'ADD_CART_DATA':
            let filterCartId = state.carts.map(cart => {
                if (cart.id === action.payload.id) {
                    cart.quantity += 1
                    return action.payload
                }
                return cart
            })
            let existedCartData = state.carts.find(product => product.id === action.payload.id)
            if (existedCartData) {
                return {
                    ...state,
                    carts: filterCartId,
                    total: state.total + action.payload.price
                }
            }
            else {
                let newTotal = state.total + action.payload.price
                action.payload.quantity = 1;
                return {
                    ...state,
                    carts: [...state.carts, action.payload],
                    total: newTotal
                }

            }
        case 'DELETE_CART_DATA':
            const filterCartIdForDelete = state.carts.filter(
                product => product.id !== action.payload,
            );
            let existedCartDelete = state.carts.find(
                product => product.id === action.payload,
            );
            if (existedCartDelete) {
                return {
                    ...state,
                    carts: filterCartIdForDelete,
                    total:
                        state.total - existedCartDelete.price * existedCartDelete.quantity,
                };
            }
        case 'ADD_QTY':
            const addQty = state.carts.map(product => {
                if (product.id === action.payload) {
                    product.quantity += 1
                }
                return product
            })
            let existedCartAdd = state.carts.find(product => product.id === action.payload)
            if (existedCartAdd) {
                return {
                    ...state,
                    carts: addQty,
                    total: state.total + existedCartAdd.price
                }
            }
        case 'REDUCE_QTY':
            const reduceQty = state.carts.map(product => {
                if (product.id === action.payload) {
                    product.quantity = product.quantity - 1
                }
                return product
            })
            let existedCartReduce = state.carts.find(product => product.id === action.payload)
            if (existedCartReduce.quantity <= 0) {
                existedCartReduce.quantity = 1;
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    carts: reduceQty,
                    total: state.total - existedCartReduce.price
                }
            }
        default:
            return state
    }
}
export default cart;