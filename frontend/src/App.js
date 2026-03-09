import React from 'react';
import JokeSection from './components/JokeSection';
import UsersSection from './components/UsersSection';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Full Stack App</h1>
        <p>React + Spring Boot + PostgreSQL</p>
      </header>

      <main className="app-main">
        <JokeSection />
        <hr />
        <UsersSection />
      </main>
    </div>
  );
}

export default App;
