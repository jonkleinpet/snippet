import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import tokenService from '../../services/tokenService';
import UserContext from '../../Context/UserContext';
import './Navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.checkLogIn = function() {
      if (!tokenService.getAuthToken()) {
        return {isLoggedIn: false};
      }
      return {isLoggedIn: true};
    }
    const state = this.checkLogIn();
    this.state = state;
  }
  
  static contextType = UserContext;

  updateLoggedInState = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }

  async componentDidUpdate() {
    if (await tokenService.getAuthToken() && this.state.isLoggedIn === false) {
      this.updateLoggedInState();
    } else if (await !tokenService.getAuthToken() && this.state.isLoggedIn === true) {
      this.updateLoggedInState();
    }
  }

  renderLeftNav = () => {
    if(!this.state.isLoggedIn) {
      return (
        <>
          <Link to='/'>
            <nav className='nav-item'>Snippet</nav>
          </Link>
        </>
      )
    }
    return (
      <>
        <Link to='/dashboard'>
          <nav className='nav-item'>Snippet</nav>
        </Link>
      </>
    )
  }

  renderRightNav = () => {
    if (!this.state.isLoggedIn) {
      return (
        <>
          <Link to='/register'>
            <nav className='nav-item'>Register</nav>
          </Link>
          <Link to='/login'>
            <nav className='nav-item'>Login</nav>
          </Link>
        </>
      )
    }
    return (
      <>
        <Link to='/'>
          <nav className='nav-item' onClick={() => this.context.logoutUser()}>Logout</nav>
        </Link>
      </>
    )
  }
render() {
  
  return (
    <>
      <div id='left-navs'>
        {this.renderLeftNav()}
      </div>
      <div id='right-navs'>
        {this.renderRightNav()}
      </div>
    </>
  );
}
}