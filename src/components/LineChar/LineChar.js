import 'date-fns';
import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import useHttp from '../../hooks/useHttp';

import ChipsArray from './ChipsArray/ChipsArray';
import LineCharDisplay from './LineCharDisplay/LineCharDisplay';

const API_DAILY_URL = 'https://covid19.mathdro.id/api/daily';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const LineChar = () => {

    const classes = useStyles();

    const [datasets, setDatasets] = useState([]);
    const [filteredDatasets, setFilteredDatasets] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [filteredLabels, setFilteredLabels] = useState([]);
    const { response, isLoading, setUrl } = useHttp(API_DAILY_URL);
    const [filteredResponse, setFilteredResponse] = useState([]);

    useEffect(() => {
        if (response != null) {
            setFilteredResponse(response.filter(r => {
                let startB = fromDate == null ? true : new Date(r.reportDate) >= new Date(fromDate);
                let endB = toDate == null ? true : new Date(r.reportDate) <= new Date(toDate)
                return startB && endB;
            }));
        }
    }, [fromDate, toDate]);

    useEffect(() => {
        setUrl(API_DAILY_URL)
        setFilteredLabels(['Infected', 'Deaths']);
    }, []);

    useEffect(() => {
        if (filteredResponse != null)
            setDataSets(filteredResponse);

    }, [filteredResponse]);

    useEffect(() => {
        setFilteredResponse(response);
    }, [response]);

    useEffect(() => {
        setFilteredDatasets(datasets.filter(dataSet => filteredLabels.indexOf(dataSet.label) != -1));
    }, [datasets, filteredLabels]);

    const setDataSets = (response) => {
        setDatasets([
            {
                data: response.map((data) => data.confirmed.total),
                label: 'Infected',
                borderColor: '#f22718',
                backgroundColor: '#e8594f',
                fill: true,
            },
            {
                data: response.map((data) => data.deaths.total),
                label: 'Deaths',
                borderColor: '#630c06',
                backgroundColor: '#80241d',
                fill: true,
            },
            {
                data: response.map((data) => data.incidentRate),
                label: 'incident Rate',
                borderColor: '#8a8a8a',
                backgroundColor: '#bab8b8',
                fill: true,
            },
            {
                data: response.map((data) => data.totalConfirmed),
                label: 'Total Confirmed',
                borderColor: '#f1f72f',
                backgroundColor: '#f9fc7e',
                fill: true,
            },
            {
                data: response.map((data) => data.mainlandChina),
                label: 'Mainland China',
                borderColor: '#b1f23f',
                backgroundColor: '#d5f2a2',
                fill: true,
            },
            {
                data: response.map((data) => data.otherLocations),
                label: 'Other Locations',
                borderColor: '#05daed',
                backgroundColor: '#b5f0f5',
                fill: true,
            },
            {
                data: response.map((data) => data.deltaConfirmed),
                label: 'Delta Confirmed',
                borderColor: '#bb19e3',
                backgroundColor: '#e298f5',
                fill: true,
            },
        ]);
    }

    const handleDeleteLabel = (currentLabel) => {
        setFilteredLabels(filteredLabels.filter(label => currentLabel !== label));
    }

    const handleAddLabel = (label) => {
        setFilteredLabels(filteredLabels.concat(label));
    }

    const getDate = (date) => {
        return date == '' ? null : date;
    }

    return (
        response == null || isLoading ?
            <CircularProgress />
            :
            <div style={{ width: '80%' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <form className={classes.container} noValidate  >
                            <TextField
                                id="date"
                                label="From"
                                type="date"
                                defaultValue={fromDate}
                                value={fromDate}
                                onChange={(date) => setFromDate(getDate(date.target.value))}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="date"
                                label="To"
                                type="date"
                                defaultValue={toDate}
                                value={toDate}
                                onChange={(date) => setToDate(getDate(date.target.value))}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                </MuiPickersUtilsProvider>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <ChipsArray labels={filteredLabels} isDelete={true} handleClick={handleDeleteLabel} />
                    <ChipsArray labels={datasets.map(daatSet => daatSet.label).filter(label => filteredLabels.indexOf(label) == -1)} isDelete={false} handleClick={handleAddLabel} />

                </Grid>
                <LineCharDisplay labels={filteredResponse == null ? [] : filteredResponse.map(({ reportDate }) => reportDate)} dataSets={filteredDatasets} />
            </div>
    )
}

export default LineChar;