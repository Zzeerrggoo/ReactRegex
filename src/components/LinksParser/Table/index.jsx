import React from 'react';
import style from '../LinksParser.module.scss';
import PropTypes from 'prop-types';

function Table({ links }) {
  return (
    <table className={style.container}>
      <thead>
        <tr>
          <th>{'Hyperlink Value'}</th>
          <th>{'Link Label'}</th>
        </tr>
      </thead>
      <tbody>
        {links.map((item, index) => (
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
  );
}

Table.propTypes = {
  links: PropTypes.instanceOf(Array).isRequired,
};

export default Table;
