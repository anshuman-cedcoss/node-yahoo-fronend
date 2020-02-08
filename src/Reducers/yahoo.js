export const yahooRedux = (state = {}, action) => {
    console.log(state, action);
    switch ( action.type ) {
        case 'getTemp' : return {
            ...state,
            ...action.state
        };
        default : return state;
    }
};