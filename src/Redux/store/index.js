import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
//para no usar esa cte de window fea
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));