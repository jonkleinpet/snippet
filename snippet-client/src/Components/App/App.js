import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import RegisterRoute from '../../Routes/RegisterRoute/RegisterRoute';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import LandingRoute from '../../Routes/LandingRoute/LandingRoute';
import DashboardRoute from '../../Routes/DashboardRoute/DashboardRoute';
import { UserProvider } from '../../Context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <section id="main">
          <Route exact path="/" component={ LandingRoute } />
          <Route path="/dashboard" component={ DashboardRoute } />
          <Route path="/register" component={ RegisterRoute } />
          <Route path="/login" component={ LoginRoute } />
        </section>
      </div>
    </UserProvider>
  );
}

export default App;
