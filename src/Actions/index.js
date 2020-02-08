import {requests} from "../services";

// Action to Re-sync necessary Info
export const getNewCityTemp = (params) => dispatch => {
    requests.getRequest("yahoo", params).then(e => {
        console.log(e);
        if (e.success) {
            dispatch({
                type: 'getTemp',
                success : true,
                state : e
            })
        } else {
            dispatch({
                type: 'getTemp',
                success : false,
                state : e
            })
        }
    });
};