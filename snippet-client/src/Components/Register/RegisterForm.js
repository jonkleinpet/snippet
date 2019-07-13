import React, { Component } from 'react';
import apiService from '../../services/apiService';
import UserContext from '../../Context/UserContext';
import tokenService from '../../services/tokenService';

export default class RegisterForm extends Component {
  state = {
    user_name: '',
    password: ''
  }

  static contextType = UserContext;

  handleSubmit = (e) => {
    e.preventDefault();
    this.registerUser()
  }

  registerUser = () => {
    const { history } = this.props;
    apiService
      .registerUser(this.state.user_name, this.state.password)
      .then(res => tokenService.saveAuthToken(res.authToken))
      .then(() => {
        this.context.processLogin()
        history.push('/dashboard');
      })
  }

  updateUserName = (e) => {
    this.setState({user_name: e.target.value})
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {

    return (
      <section className="user-form-section">
        <h2>Register</h2>
        <form className="user-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='user-name'>user name</label>
          <input id='user-name' name='user-name' type='text' onChange={(e) => this.updateUserName(e)} />
          <label htmlFor='password'>password</label>
          <input id='password' name='password' type='password' onChange={(e) => this.updatePassword(e)} />
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}