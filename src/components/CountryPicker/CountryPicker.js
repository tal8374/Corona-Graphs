import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { getCountries } from '../../api';
import { GLOBAL } from '../../shared/consts';

import styles from './CountryPicker.module.css';

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await getCountries());
    };

    fetchAPI();
  }, []);

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
