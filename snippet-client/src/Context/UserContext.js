import React, { Component, createContext } from 'react';
import apiService from '../services/apiService';
import tokenService from '../services/tokenService';

const UserContext = createContext({
  user: {},
  processLogin: () => {},
  logoutUser: () => {},
  registerUser: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }  
  }

  processLogin = () => {
    const jwtPayload = tokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.id,
      user_name: jwtPayload.sub
    });
  }

  setUser = user => {
    this.setState({user})
  }

  logoutUser = () => {
    this.setState({ user: {} }, () => tokenService.clearAuthToken());
  }

  registerUser = (user) => {
    apiService
      .registerUser(user)
  }

  render() {
    const value = {
      user: this.state.user,
      processLogin: this.processLogin,
      logoutUser: this.logoutUser,
      registerUser: this.registerUser
    }

    return (
      <UserContext.Provider value={value}>
        { this.props.children }
      </UserContext.Provider>
    )
  }
}