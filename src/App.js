import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import useHttp from './hooks/useHttp'

import { Cards, CountryPicker, LineChar } from './components';
import { GLOBAL } from './shared/consts';

import styles from './App.module.css';

import image from './images/corona-logo.png';

const API_URL = 'https://covid19.mathdro.id/api/';
const API_COUNTRY_URL = 'https://covid19.mathdro.id/api/countries/';

const App = () => {

  const [generalData, setGeneralData] = useState(null);
  const [country, setCountry] = useState(null);
  const { response: generalResponse, isLoading: generalIsLoading, setUrl } = useHttp(API_URL);

  useEffect(() => {
    if (country == null || country == GLOBAL) {
      setUrl(API_URL);
    } else {
      setUrl(API_COUNTRY_URL + country);
    }
  }, [country]);

  useEffect(() => {
    setGeneralData(generalResponse);
  }, [generalResponse]);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <CountryPicker handleCountryChange={(country) => setCountry(country)} />
      {(generalIsLoading || generalData == null) && <CircularProgress />}
      {
        generalData && generalIsLoading === false && 
        <Cards
          confirmed={generalData.confirmed}
          recovered={generalData.recovered}
          deaths={generalData.deaths}
          lastUpdate={generalResponse.lastUpdate}
        />
      }
      <LineChar />
    </div>
  )
}

export default App;