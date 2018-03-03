import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AdminLog from './AdminLog';
import AdminStReg from './AdminStReg';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/admin' component={AdminLog} />
                    <Route path='/admin/student/register' component={AdminStReg} />
                    <Route render={function(){
                        return <p> Not Found</p>
                    }} />
                </Switch>
            </Router>
        );
    }
}

export default App;