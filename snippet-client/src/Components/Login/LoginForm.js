import React, { Component } from 'react';
import UserContext from '../../Context/UserContext';
import apiService from '../../services/apiService';
import tokenService from '../../services/tokenService';

export default class LoginForm extends Component {
  state = {
    user_name: '',
    password: ''
  }

  static contextType = UserContext;

  handleSubmit = async (e) => {
    e.preventDefault();
    const { processLogin } = this.context;
    await this.loginUser(this.state.user_name, this.state.password);
    await processLogin();
  }

  loginUser = (user_name, password) => {
    apiService
      .loginUser(user_name, password)
      .then(res => tokenService.saveAuthToken(res.authToken))
  }

  updateUserName = (e) => {
    this.setState({ user_name: e.target.value });
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {

    return (
      <>
        <h2>Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='user-name'>user name</label>
          <input id='user-name' name='user-name' type='text' onChange={(e) => this.updateUserName(e)} />
          <label htmlFor='password'>password</label>
          <input id='password' name='password' type='password' onChange={(e) => this.updatePassword(e)} />
          <button type='submit'>Submit</button>
        </form>
      </>
    );
  }
}