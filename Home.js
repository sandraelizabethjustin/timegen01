
import React, { useState } from 'react';
import './Home.css'

function Home() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleFile3Change = (event) => {
    setFile3(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('file3', file3);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <section>
        <div className='container'>
        <div className='home-container'>
        <div className='home-content'>
        <form onSubmit={handleSubmit}>
              <div className='file-input'>
                <label htmlFor='file1'>File 1:</label>
                <input type='file' id='file1' name='file1' accept='.txt, .pdf, .doc, .docx' onChange={handleFile1Change} />
              </div>
              <div className='file-input'>
                <label htmlFor='file2'>File 2:</label>
                <input type='file' id='file2' name='file2' accept='.txt, .pdf, .doc, .docx' onChange={handleFile2Change} />
              </div>
              <div className='file-input'>
                <label htmlFor='file3'>File 3:</label>
                <input type='file' id='file3' name='file3' accept='.txt, .pdf, .doc, .docx' onChange={handleFile3Change} />
              </div>
              <button type='submit'>Upload</button>
              </form>
        </div>
        <div className='home-img'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Computer_keyboard.png/640px-Computer_keyboard.png'>

            </img>
        </div>
        </div>
        </div>
    </section>
  )
}

export default Home
