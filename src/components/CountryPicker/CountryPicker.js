import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import useHttp from '../../hooks/useHttp';
import { GLOBAL } from '../../shared/consts';

import styles from './CountryPicker.module.css';

const API_COUNTRIES_URL = 'https://covid19.mathdro.id/api/countries';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const { response, isLoading, setUrl } = useHttp(API_COUNTRIES_URL);

  useEffect(() => {
    setUrl(API_COUNTRIES_URL);
  }, []);

  useEffect(() => {
    if (response != null) {
      console.log(response)
      setCountries(response.countries.map((country) => country.name));
    }
  }, [response]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value={GLOBAL}>{GLOBAL}</option>
        {countries.map((country, i) => <option key={country} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;
