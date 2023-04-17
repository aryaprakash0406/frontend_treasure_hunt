import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default function PlayerHistogram() {
    const [players, setPlayers] = useState([
        
    ]);
    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await fetch('http://localhost:4000/api/leader');
            const data = await response.json();
            console.log(data.data.users)
            setPlayers(data.data.users);
        };
        fetchPlayers();
    }, []);

   // const [clickedPlayer, setClickedPlayer] = useState(null);

    // const handleBarClick = (elems) => {
    //     console.log(elems)
    //     if (elems.length > 0) {
    //         const clickedPlayerIndex = elems[0].index;
    //         setClickedPlayer(players[clickedPlayerIndex]);
    //     }
    // };

    // const handlePieClick = () => {
    //     setClickedPlayer(null);
    // };

    const playerLabels = players.map((player) => player.email);
    const playerScores = players.map((player) => player.score);

    // const playerTimes = players.map((player) => {
    //     const timesObj = player.time.reduce((obj, item) => {
    //         obj[item.question] = item.time;
    //         return obj;
    //     }, {});
    //     return timesObj;
    // });

    //const timeLabels = Object.keys(players[0].time);

    const barData = {
        labels: playerLabels,
        datasets: [
            {
                label: 'Score',
                data: playerScores,
                backgroundColor: '#36a2eb',
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
        },
       
    };

    // const pieData = {
    //     labels: timeLabels,
    //     datasets: [
    //         {
    //             label: 'Time taken',
    //             data: clickedPlayer?.time.map((item) => item.time),
    //             backgroundColor: [
    //                 '#FF6384',
    //                 '#36A2EB',
    //                 '#FFCE56',
    //                 '#4BC0C0',
    //                 '#9966FF',
    //                 '#FF9933',
    //             ],
    //             borderWidth: 1,
    //         },
    //     ],
    // };

    // const pieOptions = {
    //     plugins: {
    //         legend: {
    //             position: 'bottom',
    //         },
    //     },
    //     onClick: handlePieClick,
  //  };

    return (
        <div>
            <h1>Histogram of Players' Scores</h1>
            <Bar data={barData} options={barOptions} height={100}  />
            {/* {clickedPlayer && (
                <div>
                    <h2>Pie Chart for {clickedPlayer.name}</h2>
                    <Pie data={pieData} options={pieOptions} height={200} />
                </div>
            )} */}
        </div>
    );
}
