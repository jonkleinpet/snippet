import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import RegisterRoute from '../../Routes/RegisterRoute/RegisterRoute';
import LoginRoute from '../../Routes/LoginRoute/LoginRoute';
import LandingRoute from '../../Routes/LandingRoute/LandingRoute';
import DashboardRoute from '../../Routes/DashboardRoute/DashboardRoute';
import SidePaneRoute from '../../Routes/SidePaneRoute/SidePaneRoute';
import { SnippetProvider } from '../../Context/SnippetContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <section id="main">
      <SnippetProvider>
        <Route path="/" component={ SidePaneRoute } />
        <Route exact path="/" component={ LandingRoute } />
        <Route path="/dashboard" component={ DashboardRoute } />
      </SnippetProvider>
        <Route path="/register" component={ RegisterRoute } />
        <Route path="/login" component={ LoginRoute } />
      </section>
    </div>
  );
}

export default App;
