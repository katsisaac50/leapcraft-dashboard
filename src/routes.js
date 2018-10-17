import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';

export default (
    <Router>
        <div>
            <Route path='/' component={App}></Route>
            <Route path='/login' component={Login}></Route>
        </div>
    </Router>
)