import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Project from './Components/Project'
import Portfolio from './Components/Portfolio'



function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <Navbar />
      <br />
      <About />
      <br />
      <hr />
      <h1 className="skillheader">your current enrollment</h1>
      <hr />
      <Project />
      <hr />
      <h1 className="skillheader">the archives</h1>
      <hr />
      <Portfolio />

    </div>
  );
}

export default App;
