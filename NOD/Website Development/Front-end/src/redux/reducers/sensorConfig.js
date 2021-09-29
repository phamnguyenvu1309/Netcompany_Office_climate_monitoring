const sensorConfigDefaultState = {};

const sensorConfig = (state = sensorConfigDefaultState, action) => {
    switch (action.type) {
        case 'FETCH_CONFIG':
            return action.config;
        case 'ADD_CONFIG':
            return action.config;
        case 'EDIT_CONFIG':
            return {...state, ...action.updates}
        default: 
            return state
    }
}

export default sensorConfig;