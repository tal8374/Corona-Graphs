import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChar = ({ confirmed, recovered, deaths }) => {
    return (
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [
                    {
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
            }}
        />
    )
}

export default BarChar;