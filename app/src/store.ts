import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducers from './reducers';

const initialState = {
	products: [],
	cart: {items: []},
	promos: []
};

export default createStore(appReducers, initialState, applyMiddleware(thunk));