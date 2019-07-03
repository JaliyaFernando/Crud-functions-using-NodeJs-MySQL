import React,{Component} from 'react';
export default class NavBar extends Component{
    render(){
        return <div>
            <ul>
                <li><a href="/AddUser">Add New User</a></li>
                <li><a href="/AllUsers">All Users</a></li>
                <li><a href="/Search">Search User</a></li>
            </ul>
        </div>
    }
}