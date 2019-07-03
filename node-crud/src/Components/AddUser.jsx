import React, { Component } from 'react';
import axios from 'axios';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Email: '',
            Password:'',
            confirm_password:'',
            message:''
        }
    }
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        })
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirm_password: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            Name: this.state.Name,
            Email: this.state.Email,
            Password: this.state.Password,
            confirm_password: this.state.confirm_password
        };
        axios.post('http://localhost:4000/adduser', obj)
            .then(res =>
                this.setState({
                    message: res.data
                }));

        this.setState({
            Name:'',
            Email:'',
            Password:'',
            confirm_password:''
        })
    }

    render() {
        return (
                <div className="container2">
                    <h3>Add New User</h3>
                    {
                        (this.state.message) ? (
                            <h4 align="center" className="notification"> {this.state.message} </h4>
                        ) : (null)
                    }
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label>User Name </label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    value={this.state.Name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label>Email </label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="email"
                                    value={this.state.Email}
                                    onChange={this.onChangeEmail}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label>Password </label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="password"
                                    value={this.state.Password}
                                    onChange={this.onChangePassword}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label>Confirm Password </label>
                            </div>
                            <div className="col-75">
                                <input type="password"
                                       value={this.state.confirm_password}
                                       onChange={this.onChangeConfirmPassword}
                                       required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                            </div>
                            <div className="col-75">
                                <input type="submit" value="Register"/>
                            </div>
                        </div>
                    </form>
                </div>
        )
    }
}