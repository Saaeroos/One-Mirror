import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import AdminLog from './AdminLog';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage} />
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
