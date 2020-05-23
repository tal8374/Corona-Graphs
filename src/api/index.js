import axios from 'axios';

const COVID19_API_URL = 'https://covid19.mathdro.id/api';

export const getCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${COVID19_API_URL}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
