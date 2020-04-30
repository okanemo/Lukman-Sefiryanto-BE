const initialState = {
    order: [],
    chart: []
}
const order = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'GET_ORDER_FULFILLED':
            return {
                ...state,
                order: action.payload.data.result
            }
        case 'GET_ORDER_PENDING':
            return {
                ...state
            }
        case 'GET_ORDER_REJECTED':
            return {
                ...state
            }
        case 'GET_CHART_FULFILLED':
            // console.log('chart disini', action.payload.data)
            return {
                ...state,
                chart: action.payload.data.result
            }
        case 'GET_CHART_PENDING':
            return {
                ...state
            }
        case 'GET_CHART_REJECTED':
            return {
                ...state
            }


        default:
            return state;
    }
}

export default order;