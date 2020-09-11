import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';
import PropTypes from 'prop-types';

const initialState = {
  isFetching: false,
  error: null,
  results: [],
};

class LinksParser extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleSubmit = ({ values: { urlValue } }) => {
    this.setState(initialState);
    this.fetchData(urlValue);
  };

  fetchData = url => {
    this.setState({ isFetching: true });

    fetch(url, {
      'method': 'GET',
      'Content-type': 'text/html',
    })
      .then(response => response.text())
      .then(data => this.parseHtml(data))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isFetching: false }));
  };

  parseHtml = htmlText => {
    const { pattern } = this.props;

    this.setState({
      results: [...htmlText.matchAll(new RegExp(pattern, 'gm'))],
    });
  };

  render() {
    const { isFetching, error, results } = this.state;

    let status = null;

    if (error) {
      status = <p>{error.message}</p>;
    }

    if (isFetching) {
      status = 'Fetching...';
    }

    return (
      <article>
        <h1>Parser</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2> Status: {status} </h2>
        <Table links={results} />
      </article>
    );
  }
}

LinksParser.propTypes = {
  pattern: PropTypes.string,
};

LinksParser.defaultProps = {
  pattern:
    '<\\s*a\\s*(?:\\s*[a-z]+\\s*=\\s*(?:[\'"])(?:.*?)(?:[\'"]))*?\\s*href\\s*=\\s*(?<quote>[\'"])(?<link>.*?)\\k<quote>(?:\\s*[a-z]+\\s*=\\s*(?:[\'"])(?:.*?)(?:[\'"]))*?\\s*>(?<linkLabel>.*?)<\\/a>',
};

export default LinksParser;
