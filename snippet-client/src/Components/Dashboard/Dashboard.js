import React from 'react';
import SnippetContext from '../../Context/SnippetContext';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <section id="dashboard-section">
        <SnippetContext.Consumer>
          {value => value.snippets.map((s, i) => {
            return (
              <ul key={i}>
                <li>{s.content}</li>
              </ul>
              )
            })}
        </SnippetContext.Consumer>
    </section>
)}