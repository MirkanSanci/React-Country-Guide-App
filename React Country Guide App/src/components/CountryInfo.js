import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CountryInfo = ({ country, onRemoveCountry }) => {
  return (
    <div style={{ marginRight: "10px", margin: "10px" }}>
      <Paper elevation={3} className="p-3 mb-3" style={{ width: "300px", height:"250px" }}>
        <Typography variant="h6" gutterBottom>
          {country.name.common}
        </Typography>
        <Typography>
        <img style={{width:"70px", height:"60px"}} src={country.flags.svg} alt="Flag" className="flagImage" /> 
           {country.flags[0]}
        </Typography>
        <Typography>
          <strong>Başkent:</strong> {country.capital[0]}
        </Typography>
        <Typography>
          <strong>Para Birimi:</strong>{" "}
         {country.currencies[Object.keys(country.currencies)[0]].name}{" "} 
          - {country.currencies[Object.keys(country.currencies)[0]].symbol}{" "}
        </Typography>
        <Typography>
          <strong>Dil:</strong>{" "}
          {country.languages[Object.keys(country.languages)[0]]}
        </Typography>

        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => onRemoveCountry(country)}
        >
          Sil
        </Button>
      </Paper>
    </div>
  );
};

export default CountryInfo;
