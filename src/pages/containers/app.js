import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Route, Switch, Redirect } from 'react-router-dom';

import reducer from '../../reducers/index';

import LoginContainer from './login';
import NotFound from '../components/not-found/not-found';

const store = createStore(
    reducer,
    {},
    composeWithDevTools(
        applyMiddleware(
            logger,
            thunk
        )
    )
  );

class App extends Component{
    render(){
        return(
        <Provider store={store}>
            <Fragment>
            <Switch>
                <Route exact path="/" component={LoginContainer} />
                <Route component={NotFound} />
            </Switch>
            </Fragment>
        </Provider>
        )
    }
}

export default App