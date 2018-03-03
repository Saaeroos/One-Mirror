import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AdminLog from './AdminLog';
<<<<<<< HEAD
import AdminDashboard from './AdminDashboard';
import AddScore from './AddScore';

=======
import AdminStReg from './AdminStReg';
>>>>>>> 13542e13c5574883bf58b37cc7e31ae7a3534d9e

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/admin' component={AdminLog} />
<<<<<<< HEAD
                    <Route path='/admin/dashboard' component={AdminDashboard}/>
                    <Route path='/admin/addscore' component={AddScore}/>
=======
                    <Route path='/admin/student/register' component={AdminStReg} />
>>>>>>> 13542e13c5574883bf58b37cc7e31ae7a3534d9e
                    <Route render={function(){
                        return <p> Not Found</p>
                    }} />
                </Switch>
            </Router>
        );
    }
}

export default App;
