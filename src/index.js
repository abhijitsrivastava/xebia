import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import Login from './containers/Login';
import PlanetSearch from './containers/PlanetSearch';
import { BrowserRouter, Route } from 'react-router-dom'
import store from './redux/store/store';
import './App.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <jsxFragment>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login}> </Route>
                <Route path="/search" component={PlanetSearch}> </Route>
            </jsxFragment>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);;
