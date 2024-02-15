import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const apiUrl = 'https://restcountries.com/v3.1/all';
const isoApiUrl = 'https://restcountries.com/v3.1/name';

const CountryInput = ({ onCountrySelect, selectedCountries }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountryOptions = async () => {
      try {
        const response = await fetch(apiUrl);
        const countries = await response.json();
        const countryNames = countries.map((country) => country.name.common);
        setCountryOptions(countryNames);
      } catch (error) {
        console.error('Error fetching country options:', error);
      }
    };

    fetchCountryOptions();
  }, []);

  

  const handleCountrySelection = async (value) => {
    try {
      const response = await fetch(`${isoApiUrl}/${value}`);
      const data = await response.json();

      if (data.length > 0) {
        const selectedCountryData = data[0];
        // Kontrol: Seçilen ülke zaten listede var mı?
        const isCountryAlreadySelected = selectedCountries.some(
          (country) => country.name.common === selectedCountryData.name.common
        );

        if (!isCountryAlreadySelected) {
          setSelectedCountry(selectedCountryData);
          onCountrySelect(selectedCountryData);
        } else {
          alert ('Bu ülke zaten eklenmiş!');
        }
      } else {
        alert('Ülke bulunamadı!');
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
    if (!value) {
      setSelectedCountry(null);
    }
  };

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <Autocomplete
          freeSolo
          options={countryOptions}
          value={selectedCountry ? selectedCountry.name.common : null}
          inputValue={inputValue}
          onInputChange={(e, value) => handleInputChange(e, value)}
          onKeyUp={(e) => e.key === 'Enter' && handleCountrySelection(e.target.value)}
          renderInput={(params) => (
            <TextField style={{marginTop:"7px"}} {...params} label="Ülke adını yazın" variant="outlined" fullWidth />
          )}
        />
      </div>
    </div>
  );
};

export default CountryInput;
