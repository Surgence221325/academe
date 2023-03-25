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
      <h2 className="skillheader">your current enrollment</h2>
      <hr />
      <Project />
      <hr />
      <h2 className="skillheader">the archives</h2>
      <hr />
      <Portfolio />

    </div>
  );
}

export default App;
