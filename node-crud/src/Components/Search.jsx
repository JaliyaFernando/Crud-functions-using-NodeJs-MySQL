import React, { Component } from 'react';
import axios from 'axios';
import User from './User';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            Name: '',
            UserID:'',
            users:[]
        }
    }
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    getData(){
        return this.state.users.map((users,i) => {
            return (<User obj={users} key={i}/>)
        });
    }
    onSubmit() {
        axios.get('http://localhost:4000/usersByName/'+this.state.Name)
            .then(res => {
                console.log(res.data.user);
                this.setState({
                    users : res.data.user,
                    UserID : res.data.user[0].UserID
                });
            });
    }

    render() {
        return(
            <div className="container2">
                <h1>User Details</h1>
                <form>
                    <div className="row">
                        <div className="col-25">
                            <label>User Name </label>
                        </div>
                        <div className="col-50">
                            <input
                                type="text"
                                value={this.state.Name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="col-25" align="center">
                            <input type="submit" value="Search" onClick={this.onSubmit}/>
                        </div>
                    </div>
                </form>
                {
                    (this.state.UserID) ? (
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
                    ) : (null)
                }
            </div>
        )
    }
}