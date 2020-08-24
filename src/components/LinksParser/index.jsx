import React, { Component } from 'react';
import LinksParserForm from './LinksParserForm';
import Loader from 'react-loader-spinner';
import style from './LinksParser.module.scss';

class LinksParser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      error: null,
      htmlText: '',
    };
  }

  handleSubmit = ({ values: { urlValue } }) => {
    this.fetchData(urlValue);
  };

  fetchData = url => {
    this.setState({ isFetching: true, error: null, htmlText: '' });

    fetch(url, {
      'method': 'GET',
      'Content-type': 'text/html',
    })
      .then(response => response.text())
      .then(data => this.setState({ htmlText: data }))
      .catch(error => this.setState({ error: true }))
      .finally(() => this.setState({ isFetching: false }));
  };

  getLinks = () => {
    const { htmlText } = this.state;
    return [...htmlText.matchAll(this.regExp)];
  };

  regExp = /<\s*a\s*(?:\s*[a-z]+\s*=\s*(?:['"])(?:.*?)(?:['"]))*?\s*href\s*=\s*(?<quote>['"])(?<link>.*?)\k<quote>(?:\s*[a-z]+\s*=\s*(?:['"])(?:.*?)(?:['"]))*?\s*>(?<linkLabel>.*?)<\/a>/gm;

  render() {
    const { isFetching, error } = this.state;
    return (
      <>
        <LinksParserForm onSubmit={this.handleSubmit} />

        {isFetching && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={200}
            width={200}
            className={style.loader}
          />
        )}

        {error ? (
          <p>{'Something wrong, try another link'}</p>
        ) : (
          <table className={style.container}>
            <thead>
              <tr>
                <th>{'Hyperlink Value'}</th>
                <th>{'Link Label'}</th>
              </tr>
            </thead>
            <tbody>
              {this.getLinks().map((item, index) => (
                <tr key={index}>
                  <td>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.groups.link}
                    >
                      {item.groups.link}
                    </a>
                  </td>
                  <td>
                    <p>{item.groups.linkLabel}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
}

export default LinksParser;
