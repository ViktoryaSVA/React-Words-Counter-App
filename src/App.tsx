import React, { useState } from 'react';
import './App.css';

interface Result {
  [key: string]: number;
}

function App() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<Result>({});

  const handleSubmit = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;

      if (!apiUrl) {
        console.error('REACT_APP_API_URL is not defined');
        return;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <div className="App">
        <p>Input text</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <p>Results</p>
          <div className="result-container">
          <div className="result-box">
            {Object.entries(result).map(([key, value]) => (
                <div key={key} className="result-item">
                  <span>{key}:</span> <span>{value}</span>
                </div>
            ))}
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>

      </div>
  );
}

export default App;
