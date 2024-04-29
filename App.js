import React from 'react';
import Header from './components/Header/Header';
import Home from './components/Pages/Home/Home';
import Footer from './components/Footer/Footer';


import FileUpload from './components/FileUpload';
import GenerateTimetable from './components/GenerateTimetable';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="container mt-5">
      
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;

