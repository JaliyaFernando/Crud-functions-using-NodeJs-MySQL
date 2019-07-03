import React, { Component } from 'react';
import axios from 'axios';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePrePassword = this.onChangePrePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Email: '',
            Password:'',
            PrePassword:'',
            confirm_password:'',
            message:''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/usersByID/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data.user[0].Name);
                this.setState({
                    Name: response.data.user[0].Name,
                    Email: response.data.user[0].Email,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
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
    onChangePrePassword(e) {
        this.setState({
            PrePassword: e.target.value
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
            PrePassword: this.state.PrePassword,
            confirm_password: this.state.confirm_password
        };
        axios.put('http://localhost:4000/updateuser/'+this.props.match.params.id, obj)
            .then(res =>
                this.setState({
                    message: res.data
                }));
        window.location.href = "/AllUsers";
        this.setState({
            Name:'',
            Email:'',
            Password:'',
            confirm_password:''
        });
    }

    render() {
        return (
            <div className="container2">
                <h3>Edit User {this.props.match.params.id}</h3>
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
                                type="text"
                                value={this.state.Email}
                                onChange={this.onChangeEmail}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Previous Password </label>
                        </div>
                        <div className="col-75">
                            <input
                                type="password"
                                value={this.state.PrePassword}
                                onChange={this.onChangePrePassword}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>New Password </label>
                        </div>
                        <div className="col-75">
                            <input
                                type="password"
                                value={this.state.Password}
                                onChange={this.onChangePassword}
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
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                        </div>
                        <div className="col-75">
                            <input type="submit" value="Update"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}