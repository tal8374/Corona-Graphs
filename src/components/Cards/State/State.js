import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';


// const State = ({ confirmed, recovered, deaths, lastUpdate }) => {
const State = ({ value, lastUpdate, title }) => {
    return (
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" component="h2">
                <CountUp start={0} end={value} duration={2.75} separator="," />
            </Typography>
            <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2" component="p">
                Number of active cases of COVID-19.
            </Typography>
        </CardContent>
    )
}

export default State;