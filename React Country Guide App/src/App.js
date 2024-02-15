import React, { useState } from 'react';
import CountryInput from './components/CountryInput';
import CountryInfo from './components/CountryInfo';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const App = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [groupSize, setGroupSize] = useState(10);
  const [warningMessage, setWarningMessage] = useState('');

  const onCountrySelect = (country) => {
    if (selectedCountries.length < groupSize) {
      setSelectedCountries([...selectedCountries, country]);
      setWarningMessage('');
    } else {
      setWarningMessage(`Grup boyutu ${groupSize} ülkeyi aştı.`);
    }
  };
  

  const removeCountry = (countryToRemove) => {
    const updatedCountries = selectedCountries.filter(
      (country) => country.name.common !== countryToRemove.name.common
    );
    setSelectedCountries(updatedCountries);
    setWarningMessage('');
  };

  const handleGroupSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGroupSize(newSize);
  
    // Kontrol 
    if (selectedCountries.length > newSize) {
      const excessCountries = selectedCountries.slice(newSize);
      setWarningMessage(`${excessCountries.length} ülke seçildi, fazla olanlar kaldırılacak.`);
      const updatedCountries = selectedCountries.slice(0, newSize);
      setSelectedCountries(updatedCountries);
    } else {
      setWarningMessage('');
    }
  };

  
  return (
    <div className="container mt-5" style={{marginTop:"10px"}}>
      <div className="row mb-3" >
        <div className="col-md-6">
          <FormControl fullWidth>
            <InputLabel style={{marginTop:"10px"}} id="groupSizeLabel">Grup Boyutu</InputLabel>
            <Select
              labelId="groupSizeLabel"
              id="groupSize"
              value={groupSize}
              onChange={handleGroupSizeChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={250}>250</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <CountryInput onCountrySelect={onCountrySelect} selectedCountries={selectedCountries} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4" style={{textAlign:"center"}}>Eklenen Ülkeler</h1>
          {warningMessage && (
            <Alert severity="warning">
              <AlertTitle>Uyarı</AlertTitle>
              {warningMessage}
            </Alert>
          )}
          <div  style={{ display: 'flex', flexWrap: 'wrap', textAlign:"center", justifyContent:"center", margin: 10}}>
            {selectedCountries.map((country, index) => (
              <CountryInfo key={index} country={country} onRemoveCountry={removeCountry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
