import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { retrieveShareStat } from '../../actions';

class TradeChart extends Component {
  componentDidMount() {
    if (!this.props.shareStats) {
      this.props.retrieveShareStat(this.props.symbol);
    }
  }

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
    if (!this.props.shareStats) {
      return null;
    }

    const data = {
      labels: this.generateLabels(200),
      datasets: [
        this.generateDataset(this.props.shareStats.close, 200),
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

    const graphOptions = [
      {
        key: 'sma',
        value: 'sma',
        text: 'Simple Moving Average',
        default: true,
      },
      { key: 'price', value: 'price', text: 'Price' },
    ];

    return (
      <div style={{ display: 'block' }}>
        <Select placeholder="Select Graph Type" options={graphOptions} />
        <Line data={data} options={options} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stats: state.shareStats,
  };
};

export default connect(mapStateToProps, { retrieveShareStat })(TradeChart);
