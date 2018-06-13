import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import App from "./component/App"
import Items from "./reducers/add_item_reducer";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
require("../scss/style.scss");
const allReducers = combineReducers({
    itemsList: Items
});

const store = createStore(
    allReducers
    
);
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider> ,    document.getElementById('root')
);
