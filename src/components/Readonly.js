import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { value, label, color } = this.props;
    return (
      <div>
        <label>{label}</label>

        <input
          type="text"
          placeholder=""
          style={{ width: '180px', fontWeight: 'bold', color: color }}
          readOnly
          value={value}
        />
      </div>
    );
  }
}
