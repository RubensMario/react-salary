import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  render() {
    const { fullSalary, onChangeBar } = this.props;

    return (
      <div className="input-field s6">
        <input
          type="number"
          placeholder=""
          value={fullSalary}
          onChange={onChangeBar}
          min="1000"
          step="100"
        />
        <label className="active left-align">Salário bruto:</label>
      </div>
    );
  }
}
