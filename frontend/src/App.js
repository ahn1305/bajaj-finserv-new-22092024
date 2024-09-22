import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';  // Import react-select for multi-select
import './App.css';

const App = () => {
  const [jsonData, setJsonData] = useState('');   // Input for JSON
  const [file, setFile] = useState(null);         // Input for file
  const [response, setResponse] = useState(null); // Backend response
  const [filteredResponse, setFilteredResponse] = useState(null); // Filtered response
  const [error, setError] = useState('');         // Error handling
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected filter options

  // Options for multi-select dropdown
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  // Handle JSON input change
  const handleJsonChange = (e) => {
    setJsonData(e.target.value);
  };

  // Handle file input and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get only Base64 part
        setFile(base64String);
      };
    }
  };

  // Handle multi-select change
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  // Submit JSON and Base64 file to the API
  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonData); // Parse JSON input
      
      // Prepare payload
      const payload = {
        data: parsedJson.data,
        file_b64: file ? file : null // Only add file_b64 if file is provided
      };

      const res = await axios.post('http://localhost:8001/bfhl', payload); // Adjust to backend URL
      setResponse(res.data); // Set response data from backend
      setFilteredResponse(null); // Reset filtered response
      setError('');          // Reset error
    } catch (err) {
      console.error(err);
      setError('Invalid JSON or request failed.');
    }
  };

  // Filter the API response based on selected options
  const applyFilters = () => {
    if (!response) return;

    // If no filters selected, show the full API response
    if (selectedOptions.length === 0) {
      setFilteredResponse(null); // Reset filtered response to show full API response
      return;
    }

    const filtered = {};
    selectedOptions.forEach(option => {
      filtered[option.value] = response[option.value];
    });

    setFilteredResponse(filtered);
  };

  // Function to render the API response or filtered response
  const renderFilteredResponse = () => {
    if (!response) return null;

    // If no filters are selected, display the full response
    if (!filteredResponse) {
      return (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      );
    }

    // If filters are applied, show the filtered response
    const formattedResponse = Object.entries(filteredResponse).map(([key, value]) => {
      if (value && value.length) {
        return (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.join(',')}
          </p>
        );
      }
      return null;
    });

    return formattedResponse.length ? formattedResponse : <p>No data available for the selected filters.</p>;
  };

  return (
    <div className="App">
      <h1>MukundPU API Client for bajaj finserv task</h1>
      
      <div className="input-section">
        <h2>Input JSON</h2>
        <textarea 
          value={jsonData} 
          onChange={handleJsonChange} 
          placeholder='{"data": ["A", "B", "C", "1"]}'
        />
        
        <h2>Upload File (optional)</h2>
        <input type="file" onChange={handleFileChange} />
        
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {response && (
        <>
          <div className="filter-section">
            <h2>Multi Filter</h2>
            <Select 
              isMulti
              options={options}
              value={selectedOptions}
              onChange={handleSelectChange}
              placeholder="Select filters"
            />
            <button onClick={applyFilters} style={{ marginTop: '10px' }}>Apply Filters</button>
          </div>

          <div className="response-section">
            <h2>Filtered Response</h2>
            {renderFilteredResponse()}
          </div>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;

