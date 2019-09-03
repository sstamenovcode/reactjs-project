import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listAllUsers } from '../../actions/postActions';
import Input from '../../../components/UI/Input/Input';

import './AdminEditRoles.scss';

class AdminEditRoles extends Component {
  state = {
    email: ''
  };

  componentDidMount() {
    this.fetchUsers();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

  };

  render() {
    return (
      <div className="admin-roles-container">
        <form onSubmit={this.handleSubmit}>
          <Input
            proptype="input"
            type="text"
            label="User email:"
            labelfor="userEmail"
            name="email" 
            value={this.state.email}
            onChange={this.handleChange} 
            id="userEmail"
          />
          <Input
            proptype="input"
            type="submit" 
            value="Set Admin" 
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(listAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditRoles);
