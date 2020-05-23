import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function ChipsArray({ labels, handleClick, isDelete }) {
    const classes = useStyles();

    return (
        <Paper component="ul" className={classes.root}>
            {labels.map((label) => {
                return (
                    <li key={label}>
                        <Chip
                            size="small"
                            deleteIcon={isDelete == true ? null : <AddIcon />}
                            label={label}
                            onDelete={() => handleClick(label)}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    );
}