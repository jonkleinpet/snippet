import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import RegisterRoute from '../../Routes/RegisterRoute/RegisterRoute';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import LandingRoute from '../../Routes/LandingRoute/LandingRoute';
import { UserProvider } from '../../Context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <section>
          <Route exact path="/" component={ LandingRoute } />
          <Route path="/register" component={ RegisterRoute } />
          <Route path="/login" component={ LoginRoute } />
        </section>
      </div>
    </UserProvider>
  );
}

export default App;
