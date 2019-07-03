import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            UserID:'',
            Name:'',
            Email:''
        }
    }
    componentDidMount() {
        this.setState({
            UserID: this.props.obj.UserID,
            Name:this.props.obj.Name,
            Email:this.props.obj.Email
        });
    }
    delete() {
        axios.delete('http://localhost:4000/users/'+this.props.obj.UserID)
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
        window.location.href = "/AllUsers";
    }
    render() {
        return (
            <tr>
                <td>{this.state.UserID}</td>
                <td>{this.state.Name}</td>
                <td>{this.state.Email}</td>
                <td>
                    <Link to={"/UpdateUser/"+this.props.obj.UserID} className="edit">Edit</Link>
                </td>
                <td>

                    <button
                        className="delete"
                        onClick={e =>
                            window.confirm("Are you sure you wish to delete this User?") &&
                            this.delete()
                        }
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}