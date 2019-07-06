import React from 'react';
import LoginForm from '../../Components/Login/LoginForm';

export default function LoginRoute(props) {
  return <LoginForm history={props.history} />
}