import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AdminLog from './AdminLog';
import AdminDashboard from './AdminDashboard';
import AddScore from './AddScore';


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/admin' component={AdminLog} />
                    <Route path='/admin/dashboard' component={AdminDashboard}/>
                    <Route path='/admin/addscore' component={AddScore}/>
                    <Route render={function(){
                        return <p> Not Found</p>
                    }} />
                </Switch>
            </Router>
        );
    }
}

export default App;
