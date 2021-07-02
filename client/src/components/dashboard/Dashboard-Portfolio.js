import React, { Component } from 'react';
import { Segment, Header, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class DashboardPortfolio extends Component {
  renderSegmentGroup(portfolios) {
    return (
      <Segment.Group>
        {portfolios.map((portfolio) => {
          return (
            <Link to={`/portfolio/${portfolio.id}`} key={portfolio.id}>
              <Segment.Group horizontal className="portfolio-segment-group">
                <Segment>{portfolio.name}</Segment>
                <Segment>{portfolio.id}</Segment>
              </Segment.Group>
            </Link>
          );
        })}
      </Segment.Group>
    );
  }

  render() {
    return this.props.portfolios ? (
      <>
        <Header as="h4">Portfolio</Header>
        {this.renderSegmentGroup(this.props.portfolios)}
      </>
    ) : (
      <>
        <Header as="h4">Portfolio</Header>
        <Segment.Group>
          <Placeholder>
            <Placeholder.Line length="full" />
            <Placeholder.Line length="full" />
          </Placeholder>
        </Segment.Group>
      </>
    );
  }
}

export default DashboardPortfolio;
