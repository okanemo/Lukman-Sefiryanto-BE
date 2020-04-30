import axios from 'axios';
import 'dotenv/config'
export const getOrder = () => {
    return {
        type: 'GET_ORDER',
        payload: axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/order/"
        })
    }
}
export const chartHistory = () => {
    return {
        type: 'GET_CHART',
        payload: axios({
            method: "GET",
            url: process.env.REACT_APP_URL + "/order/chart"
        })
    }
}