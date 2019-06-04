import React, { Component } from 'react';
import apiService from '../../services/apiService';

export default class RegisterForm extends Component {
  state = {
    user_name: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  registerUser = () => {
    apiService.registerUser(this.state.user_name, this.state.password);
  }

  updateUserName = (e) => {
    this.setState({user_name: e.target.value})
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {

    return (
      <>
        <h2>Register</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='user-name'>user name</label>
          <input id='user-name' name='user-name' type='text' onChange={(e) => this.updateUserName(e)} />
          <label htmlFor='password'>password</label>
          <input id='password' name='password' type='password' onChange={(e) => this.updatePassword(e)} />
          <button type="submit">Submit</button>
          </form>
      </>
    );
  }
}