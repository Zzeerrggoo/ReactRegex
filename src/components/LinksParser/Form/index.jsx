import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { string, isSchema } from 'yup';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlValue: '',
      error: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, validationSchema } = this.props;
    const { urlValue } = this.state;

    validationSchema
      .validate(urlValue)
      .then(value => {
        this.setState({
          urlValue: '',
          error: null,
        });
        onSubmit({
          values: {
            urlValue: value,
          },
          event: e,
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      urlValue: value,
    });
  };

  render() {
    const { urlValue, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={urlValue} onChange={this.handleChange} />
        {error && <span>{error.message}</span>}
        <br />
        <button type="submit" title="start parse hyperlinks">
          parse
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  validationSchema: function (props, propName) {
    const validationSchemaPropValue = props[propName];
    if (!isSchema(validationSchemaPropValue)) {
      return new Error(`${propName} must be an Yup schema`);
    }
  },
};

Form.defaultProps = {
  validationSchema: string().url().required(),
};

export default Form;
