import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import MainView from './components/MainView'

export default function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <MainView />
    </div>
  );
}