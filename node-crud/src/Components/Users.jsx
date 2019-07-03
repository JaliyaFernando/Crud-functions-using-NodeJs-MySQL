import React, { Component } from 'react';
import axios from 'axios';
import User from './User';

export default class Users extends Component {
    constructor(props){
        super(props);
        this.state ={
            users:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/users')
            .then(res => {
                this.setState({
                    users : res.data
                });
            });
    }
    getData(){
        return this.state.users.map((users,i) => {
            return (<User obj={users} key={i}/>)
        });
    }
    render() {
        return(
            <div className="container">
                <h1>All Users</h1>
                <table width="100%">
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getData()}
                    </tbody>
                </table>
            </div>
        )
    }
}