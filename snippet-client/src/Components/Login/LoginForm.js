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

  handleSubmit = (e) => {
    e.preventDefault();
    this.loginUser(this.state.user_name, this.state.password);
  }
  
  loginUser = (user_name, password) => {
    const {history} = this.props;
    apiService
    .loginUser(user_name, password)
    .then(res => tokenService.saveAuthToken(res.authToken))
    .then(() => this.context.processLogin())
    .then(() => {
      history.push('/dashboard')
  });
    
  }

  updateUserName = (e) => {
    this.setState({ user_name: e.target.value });
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {

    return (
      <section className="user-form-section">
        <h2>Login</h2>
          <form className="user-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor='user-name'>user name</label>
            <input id='user-name' name='user-name' type='text' onChange={(e) => this.updateUserName(e)} />
            <label htmlFor='password'>password</label>
            <input id='password' name='password' type='password' onChange={(e) => this.updatePassword(e)} />
            <button type='submit'>Submit</button>
          </form>
      </section>
    );
  }
}