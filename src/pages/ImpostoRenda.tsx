import React, { useState } from 'react';

export default function ImpostoRenda() {
  const [salarioBase, setSalarioBase] = useState('');
  const [dependentes, setDependentes] = useState('0');
  const [outrasDeducoes, setOutrasDeducoes] = useState('0');

  const calcularIRPF = () => {
    const salario = parseFloat(salarioBase) || 0;
    const numDependentes = parseInt(dependentes) || 0;
    const deducoes = parseFloat(outrasDeducoes) || 0;

    // Dedução por dependente (2024)
    const deducaoPorDependente = 189.59;
    const totalDeducaoDependentes = numDependentes * deducaoPorDependente;

    // Cálculo do INSS
    const calcularINSS = (salario: number) => {
      const faixas = [
        { ate: 1412.00, aliquota: 0.075 },
        { ate: 2666.68, aliquota: 0.09 },
        { ate: 4000.03, aliquota: 0.12 },
        { ate: 7786.02, aliquota: 0.14 }
      ];

      let desconto = 0;
      let salarioRestante = salario;
      let salarioAnterior = 0;

      for (const faixa of faixas) {
        if (salario > salarioAnterior) {
          const baseCalculo = Math.min(salario, faixa.ate) - salarioAnterior;
          desconto += baseCalculo * faixa.aliquota;
          salarioRestante -= baseCalculo;
          salarioAnterior = faixa.ate;
        }
      }

      return Math.min(desconto, 7786.02 * 0.14);
    };

    const descontoINSS = calcularINSS(salario);

    // Base de cálculo do IR
    const baseCalculo = salario - descontoINSS - totalDeducaoDependentes - deducoes;

    // Tabela IR 2024
    let aliquota = 0;
    let deducaoTabela = 0;

    if (baseCalculo <= 2112.00) {
      aliquota = 0;
      deducaoTabela = 0;
    } else if (baseCalculo <= 2826.65) {
      aliquota = 0.075;
      deducaoTabela = 158.40;
    } else if (baseCalculo <= 3751.05) {
      aliquota = 0.15;
      deducaoTabela = 370.40;
    } else if (baseCalculo <= 4664.68) {
      aliquota = 0.225;
      deducaoTabela = 651.73;
    } else {
      aliquota = 0.275;
      deducaoTabela = 884.96;
    }

    const impostoDevido = (baseCalculo * aliquota) - deducaoTabela;
    const impostoFinal = Math.max(impostoDevido, 0);

    return {
      baseCalculo,
      aliquotaEfetiva: baseCalculo > 0 ? (impostoFinal / baseCalculo) * 100 : 0,
      descontoINSS,
      deducaoDependentes: totalDeducaoDependentes,
      impostoFinal
    };
  };

  const resultado = calcularIRPF();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2C3E50]">Cálculo do Imposto de Renda</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Explicação do cálculo */}
        <div className="p-4 bg-[#5DADE2] bg-opacity-10 rounded-md">
          <h3 className="font-semibold text-[#2C3E50] mb-2">Como é calculado?</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[#2C3E50]">
            <li>Deduz-se do salário bruto o valor do INSS</li>
            <li>Subtrai-se R$ 189,59 por dependente (se houver)</li>
            <li>Aplicam-se outras deduções (previdência privada, pensão, etc.)</li>
            <li>Sobre a base de cálculo, aplica-se a alíquota correspondente</li>
            <li>Do resultado, subtrai-se a parcela a deduzir da faixa</li>
          </ol>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Salário Bruto
            </label>
            <input
              type="number"
              value={salarioBase}
              onChange={(e) => setSalarioBase(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-[#5DADE2] focus:border-[#5DADE2]"
              placeholder="Digite o salário bruto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Número de Dependentes
            </label>
            <input
              type="number"
              value={dependentes}
              onChange={(e) => setDependentes(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-[#5DADE2] focus:border-[#5DADE2]"
              min="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
              Outras Deduções (Previdência Privada, Pensão, etc.)
            </label>
            <input
              type="number"
              value={outrasDeducoes}
              onChange={(e) => setOutrasDeducoes(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-[#5DADE2] focus:border-[#5DADE2]"
              min="0"
            />
          </div>
        </div>

        {/* Tabela progressiva */}
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-[#2C3E50] mb-2">Tabela Progressiva IR 2024</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#5DADE2] text-white">
                  <th className="p-2">Base de Cálculo</th>
                  <th className="p-2">Alíquota</th>
                  <th className="p-2">Dedução</th>
                </tr>
              </thead>
              <tbody className="text-[#2C3E50]">
                <tr><td className="p-2">Até R$ 2.112,00</td><td className="p-2">Isento</td><td className="p-2">-</td></tr>
                <tr><td className="p-2">R$ 2.112,01 até R$ 2.826,65</td><td className="p-2">7,5%</td><td className="p-2">R$ 158,40</td></tr>
                <tr><td className="p-2">R$ 2.826,66 até R$ 3.751,05</td><td className="p-2">15%</td><td className="p-2">R$ 370,40</td></tr>
                <tr><td className="p-2">R$ 3.751,06 até R$ 4.664,68</td><td className="p-2">22,5%</td><td className="p-2">R$ 651,73</td></tr>
                <tr><td className="p-2">Acima de R$ 4.664,68</td><td className="p-2">27,5%</td><td className="p-2">R$ 884,96</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resultados */}
        <div className="p-4 bg-gray-50 rounded-md space-y-2">
          <p>
            <span className="font-medium">Desconto INSS:</span>{' '}
            {resultado.descontoINSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p>
            <span className="font-medium">Dedução Dependentes:</span>{' '}
            {resultado.deducaoDependentes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p>
            <span className="font-medium">Base de Cálculo IR:</span>{' '}
            {resultado.baseCalculo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p>
            <span className="font-medium">Alíquota Efetiva:</span>{' '}
            {resultado.aliquotaEfetiva.toFixed(2)}%
          </p>
          <p className="text-lg font-semibold text-[#58D68D]">
            Imposto de Renda a Pagar:{' '}
            {resultado.impostoFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </div>
  );
}