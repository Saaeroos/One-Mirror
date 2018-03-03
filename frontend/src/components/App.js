import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AdminLog from './AdminLog';
import StudentLogin from './StudentLogin';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/studentlogin' component={StudentLogin} />
                    <Route path='/admin' component={AdminLog} />
                    <Route render={function(){
                        return <p> Not Found</p>
                    }} />
                </Switch>
            </Router>
        );
    }
}

export default App;
