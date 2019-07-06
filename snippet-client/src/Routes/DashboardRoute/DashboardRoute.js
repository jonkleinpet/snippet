import React from 'react';
import Dashboard from '../../Components/Dashboard/Dashboard';
import { SnippetProvider } from '../../Context/SnippetContext';

export default function DashboardRoute() {
  return (
    <SnippetProvider>
      <Dashboard />
    </SnippetProvider>
  )
}
