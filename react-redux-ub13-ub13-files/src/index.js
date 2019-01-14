import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './App';
import { fetchMovies } from './actions';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.dispatch(fetchMovies());

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('app'));
