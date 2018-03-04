import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import AdminLog from './AdminLog';

import AdminStReg from './AdminStReg';
import AdminDashboard from './AdminDashboard';
import AddScore from './AddScore';
import EditStudentDetails from './EditStudentDetails'
import StudentLogin from './StudentLogin';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path='/admin' component={AdminLog} />
                    <Route path='/admin/dashboard' component={AdminDashboard}/>
                    <Route path='/admin/addscore' component={AddScore}/>
                    <Route path='/admin/student/register' component={AdminStReg} />
                    <Route path='/admin/editdetails' component={EditStudentDetails} />
                    <Route exact path='/' component={HomePage} />
                    <Route path='/studentlogin' component={StudentLogin} />

                    <Route render={function(){
                        return <p> Not Found</p>
                    }} />
                </Switch>
            </Router>
        );
    }
}

export default App;
