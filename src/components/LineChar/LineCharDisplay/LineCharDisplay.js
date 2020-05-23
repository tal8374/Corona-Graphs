
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineCharDisplay = ({labels, dataSets}) => {
    return <Line
        data={{
            labels: labels,
            datasets: dataSets,
        }}
    />
}

export default LineCharDisplay;