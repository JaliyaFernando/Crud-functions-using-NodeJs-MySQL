import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddUser from './Components/AddUser';
import UpdateUser from './Components/UpdateUser';
import AllUsers from './Components/Users';
import Search from './Components/Search';

const Main = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={AddUser} />
            <Route path='/AddUser' component={AddUser} />
            <Route path='/UpdateUser/:id' component={UpdateUser} />
            <Route path='/AllUsers' component={AllUsers} />
            <Route path='/Search' component={Search} />
        </Switch>
    </Router>
)

export default Main;