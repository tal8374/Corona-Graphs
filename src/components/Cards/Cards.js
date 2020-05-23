import React from 'react';
import { Card, Grid } from '@material-ui/core';
import classnames from 'classnames';

import BarChar from './BarChar/BarChar';
import State from './State/State';

import styles from './Cards.module.css';

const Cards = ({ confirmed, recovered, deaths, lastUpdate }) => {

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={3} component={Card} className={classnames(styles.card, styles.infected)}>
          <State value={confirmed.value} lastUpdate={lastUpdate} title={'Infected'} />
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={classnames(styles.card, styles.recovered)}>
          <State value={recovered.value} lastUpdate={lastUpdate} title={'Recovered'} />
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={classnames(styles.card, styles.deaths)}>
          <State value={deaths.value} lastUpdate={lastUpdate} title={'Deaths'} />
        </Grid>
        <Grid item xs={12} md={10} >
          <BarChar confirmed={confirmed} recovered={recovered} deaths={deaths} />
        </Grid>
      </Grid>
    </div>
  );
};
export default Cards;
