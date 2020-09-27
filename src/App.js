// App react para, a partir de um valor de salário (fornecido pelo usuário)
// Calcular descontos do INSS(progressivo) e IRPF
// Mostrando porcentagens através de uma barra colorida

import React, { Component } from 'react';
import ChangeBar from './components/Bar/Changebar';
import InputReadOnly from './components/Readonly';
import InputFullSalary from './components/Fullsalary';
import {
  liquidSalaryCalculator,
  irpfCalculator,
  inssCalculator,
} from './helpers/taxesCalculatorHelpers';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleChangeBar = (event) => {
    const fullSalary = +event.target.value;

    this.setState({ fullSalary });
  };

  render() {
    // Valores para controle da barra
    const { fullSalary } = this.state;
    const bar1 = inssCalculator(fullSalary).inssPercentage;
    const bar2 = irpfCalculator(fullSalary).irpfPercentage;
    const bar3 = liquidSalaryCalculator(fullSalary).liquidSalaryPercentage;

    // Valores formatados para impressão nos inputs somente leitura
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    const inssBase = formatter.format(fullSalary);
    const inssDiscount = formatter.format(
      inssCalculator(fullSalary).inssDiscount
    );
    const inssPercentage = formatter.format(
      inssCalculator(fullSalary).inssPercentage
    );
    const irpfBase = formatter.format(irpfCalculator(fullSalary).irpfBase);
    const irpfDiscount = formatter.format(
      irpfCalculator(fullSalary).irpfDiscount
    );
    const irpfPercentage = formatter.format(
      irpfCalculator(fullSalary).irpfPercentage
    );
    const liquidSalary = formatter.format(
      liquidSalaryCalculator(fullSalary).liquidSalary
    );
    const liquidSalaryPercentage = formatter.format(
      liquidSalaryCalculator(fullSalary).liquidSalaryPercentage
    );

    return (
      <div className="App container">
        <h1 className="center-align">React Salário</h1>
        <div>
          <InputFullSalary onChangeBar={this.handleChangeBar} />
          <div className="input-field s6">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputReadOnly value={inssBase} label={'Base INSS:'} />
              <InputReadOnly
                value={`${inssDiscount} (${inssPercentage}%)`}
                label={'Desconto INSS:'}
                color={'#020F59'}
              />
              <InputReadOnly value={irpfBase} label={'Base IRPF:'} />
              <InputReadOnly
                value={`${irpfDiscount} (${irpfPercentage}%)`}
                label={'Desconto IRPF:'}
                color={'#0424D9'}
              />
              <InputReadOnly
                value={`${liquidSalary} (${liquidSalaryPercentage}%)`}
                label={'Salário líquido:'}
                color={'#3DADF2'}
              />
            </div>
          </div>
          <ChangeBar barValue1={bar1} barValue2={bar2} barValue3={bar3} />
        </div>
      </div>
    );
  }
}
