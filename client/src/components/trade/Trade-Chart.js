import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import { retrieveShareStat } from '../../actions';

class TradeChart extends Component {
  state = {
    graph: 'PRICE',
  };

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
    label,
    func,
    backgroundColor = 'rgb(255, 99, 132)',
    borderColor = 'rgb(255, 99, 132, 0.2)'
  ) {
    return {
      label,
      data: func,
      fill: false,
      backgroundColor,
      borderColor,
    };
  }

  generateLabels(num) {
    let counter = 1;
    const labels = [];
    while (counter <= num) {
      labels.push(counter.toString());
      counter++;
    }

    return labels;
  }

  handleOnChange = (e, { value }) => {
    this.setState({ graph: value });
  };

  render() {
    if (!this.props.shareStats) {
      return null;
    }

    let datasets = [];
    if (this.state.graph === 'PRICE') {
      datasets = [
        this.generateDataset(
          'Share Price',
          this.props.shareStats.close.slice(200),
          'rgb(255, 99, 132)',
          'rgba(255, 99, 132, 0.2)'
        ),
      ];
    } else {
      const backgroundColor = 'rgb(22, 171, 57)';
      const borderColor = 'rgba(22, 171, 57, 0.2)';
      datasets = [
        this.generateDataset(
          '200 Day SMA',
          this.calculateSMA(this.props.shareStats.close, 200)
        ),
        this.generateDataset(
          '50 Day SMA',
          this.calculateSMA(this.props.shareStats.close, 50),
          backgroundColor,
          borderColor
        ),
      ];
    }

    const data = {
      labels: this.generateLabels(200),
      datasets,
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
      { key: 'PRICE', value: 'PRICE', text: 'Price' },
      {
        key: 'SMA',
        value: 'SMA',
        text: 'Simple Moving Average',
        default: true,
      },
    ];

    return (
      <div style={{ margin: '1em 0em' }}>
        <div style={{ padding: '0.5em 0em' }}>
          <Dropdown
            onChange={this.handleOnChange}
            selection
            fluid
            options={graphOptions}
            value={this.state.graph}
          />
        </div>
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
