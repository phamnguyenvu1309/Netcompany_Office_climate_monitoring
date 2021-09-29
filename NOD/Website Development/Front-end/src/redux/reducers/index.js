import ThemeReducer from "./ThemeReducer"
import sensorConfigReducer from "./sensorConfig";
import feedsReducer from "./feeds";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combineReducer = () => {
    const store = createStore(
        combineReducers({
            ThemeReducer, 
            sensorConfig: sensorConfigReducer,
            feeds: feedsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
      );
    
      return store;
};

export default combineReducer
