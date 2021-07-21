import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TradeChart extends Component {
  calculateSMA(dataset, days) {
    const sma = [];
    // dataset contains 400 data points taken from the past 400 days
    for (let i = 0; i < dataset.length / 2; i++) {
      let counter = 0;
      let sum = 0;

      while (dataset[i + counter] && counter < days) {
        sum += dataset[i + counter];
        counter++;
      }
      sma.push(parseFloat((sum / days).toFixed(2)));
    }

    return sma;
  }

  generateDataset(
    dataset,
    daySMA,
    backgroundColor = 'rgb(255, 99, 132)',
    borderColor = 'rgb(255, 99, 132, 0.2)'
  ) {
    return {
      label: `${daySMA} Day SMA`,
      data: this.calculateSMA(dataset, daySMA),
      fill: false,
      backgroundColor,
      borderColor,
    };
  }

  generateLabels(num) {
    let counter = 1;
    const labels = [];
    while (counter <= num) {
      counter++;
      labels.push(counter.toString());
    }

    return labels;
  }

  render() {
    const data = {
      labels: this.generateLabels(200),
      datasets: [
        this.generateDataset(
          this.props.shareStats.close,
          200,
          'rgb(208, 25, 25)',
          'rgba(208, 25, 25, 0.2)'
        ),
        this.generateDataset(
          this.props.shareStats.close,
          50,
          'rgb(22, 171, 57)',
          'rgba(22, 171, 57, 0.2)'
        ),
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <>
        <Line data={data} options={options} />
      </>
    );
  }
}

export default TradeChart;
