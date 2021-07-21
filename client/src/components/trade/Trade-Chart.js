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

    const countryOptions = [
      { key: 'af', value: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', text: 'Australia' },
      { key: 'at', value: 'at', text: 'Austria' },
      { key: 'az', value: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', text: 'Benin' },
    ];

    return (
      <div>
        <Select placeholder="Select your country" options={countryOptions} />
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
