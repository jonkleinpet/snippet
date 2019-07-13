import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <section id="landing-section">
      <h1>Snippet App</h1>
      <Link to="/register">
        <div>
          Create an Account
        </div>
      </Link>
      <Link to="/login">
        <div>
          Login
        </div>
      </Link>
    </section>
  )
}