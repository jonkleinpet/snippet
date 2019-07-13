import React from 'react';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { SnippetProvider } from '../../Context/SnippetContext';


export default function DashboardRoute() {
  return (
    <SnippetProvider>
      <h2>Your Code Snippets</h2>
      <Dashboard />
    </SnippetProvider>
  )
}
