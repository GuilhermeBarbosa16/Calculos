import React, { useState } from 'react';

export default function Previdencia() {
  const [salarioBase, setSalarioBase] = useState('');

  const calcularINSS = (salario: number) => {
    // Tabela INSS 2024
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

    return Math.min(desconto, 7786.02 * 0.14); // Teto máximo de contribuição
  };

  const salario = parseFloat(salarioBase) || 0;
  const descontoINSS = calcularINSS(salario);
  const salarioLiquido = salario - descontoINSS;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cálculo da Previdência (INSS)</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salário Base
          </label>
          <input
            type="number"
            value={salarioBase}
            onChange={(e) => setSalarioBase(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Digite o salário base"
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">Tabela INSS 2024</h3>
            <ul className="space-y-1 text-sm">
              <li>Até R$ 1.412,00: 7,5%</li>
              <li>De R$ 1.412,01 até R$ 2.666,68: 9%</li>
              <li>De R$ 2.666,69 até R$ 4.000,03: 12%</li>
              <li>De R$ 4.000,04 até R$ 7.786,02: 14%</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-md space-y-3">
            <p>
              <span className="font-semibold">Salário Base:</span>{' '}
              {salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p>
              <span className="font-semibold">Desconto INSS:</span>{' '}
              {descontoINSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              Salário Líquido:{' '}
              {salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}