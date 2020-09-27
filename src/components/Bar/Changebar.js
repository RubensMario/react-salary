import React from 'react';
//import "./styles.css";
import Bar from './Bar';

export default class ChangeBar extends React.Component {
  render() {
    const { barValue1, barValue2, barValue3 } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bar value={barValue1} color="#020F59" />
        <Bar value={barValue2} color="#0424D9" />
        <Bar value={barValue3} color="#3DADF2" />
      </div>
    );
  }
}
