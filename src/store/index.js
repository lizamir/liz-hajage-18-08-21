import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { weatherReducer } from './reducer/weatherReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(weatherReducer, composeEnhancers(applyMiddleware(thunk)))