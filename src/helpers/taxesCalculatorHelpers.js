// Calcular descontos progressivos do INSS
// Identifica a faixa salarial do valor dado pelo usuário
// Chama função para calcular o desconto
// Retorna desconto do INSS e a alíquota efetiva descontada do salário
function inssCalculator(salary) {
  // Limites de cada faixa salarial
  const limitRange1 = 1045;
  const limitRange2 = 2089.6;
  const limitRange3 = 3134.4;
  const limitRange4 = 6101.06;

  let inssDiscount = null;
  let inssPercentage = null;

  if (salary <= limitRange1) {
    inssDiscount = discount(1, salary);
  }

  if (salary > limitRange1 && salary <= limitRange2) {
    inssDiscount = discount(1, limitRange1) + discount(2, salary);
  }

  if (salary > limitRange2 && salary <= limitRange3) {
    inssDiscount =
      discount(1, limitRange1) + discount(2, limitRange2) + discount(3, salary);
  }

  if (salary > limitRange3 && salary <= limitRange4) {
    inssDiscount =
      discount(1, limitRange1) +
      discount(2, limitRange2) +
      discount(3, limitRange3) +
      discount(4, salary);
  }

  if (salary > limitRange4) {
    inssDiscount = discount(5, salary);
  }

  inssPercentage = (inssDiscount / salary) * 100;

  return { inssDiscount, inssPercentage };

  // Calcula desconto de acordo com a faixa salarial
  function discount(salaryRange, value) {
    const discount1 = value * 0.075;
    const discount2 = (value - limitRange1) * 0.09;
    const discount3 = (value - limitRange2) * 0.12;
    const discount4 = (value - limitRange3) * 0.14;
    const discount5 = 713.1;

    // Poderia usar object literals
    switch (salaryRange) {
      case 1:
        return discount1;
      case 2:
        return discount2;
      case 3:
        return discount3;
      case 4:
        return discount4;
      default:
        return discount5;
    }
  }
}

irpfCalculator(3900);
function irpfCalculator(salary) {
  let irpfDiscount = null;

  const deduction2 = 142.8;
  const deduction3 = 354.8;
  const deduction4 = 636.13;
  const deduction5 = 869.36;

  const limitRange1 = 1903.98;
  const limitRange2 = 2826.65;
  const limitRange3 = 3751.05;
  const limitRange4 = 4664.68;

  let irpfBase = salary - inssCalculator(salary).inssDiscount;
  if (irpfBase <= limitRange1) {
    irpfDiscount = 0;
  }

  if (irpfBase > limitRange1 && irpfBase <= limitRange2) {
    irpfDiscount = irpfBase * 0.075 - deduction2;
  }

  if (irpfBase > limitRange2 && irpfBase <= limitRange3) {
    irpfDiscount = irpfBase * 0.15 - deduction3;
  }

  if (irpfBase > limitRange3 && irpfBase <= limitRange4) {
    irpfDiscount = irpfBase * 0.225 - deduction4;
  }

  if (irpfBase > limitRange4) {
    irpfDiscount = irpfBase * 0.275 - deduction5;
  }

  let irpfPercentage = (irpfDiscount / salary) * 100;

  return { irpfBase, irpfDiscount, irpfPercentage };
}

function liquidSalaryCalculator(salary) {
  let liquidSalary =
    salary -
    (inssCalculator(salary).inssDiscount + irpfCalculator(salary).irpfDiscount);
  let liquidSalaryPercentage = (liquidSalary / salary) * 100;
  return { liquidSalary, liquidSalaryPercentage };
}

export { liquidSalaryCalculator, irpfCalculator, inssCalculator };
