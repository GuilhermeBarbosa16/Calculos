import React, { useState } from 'react';

export default function SalarioAnual() {
  const [salarioMensal, setSalarioMensal] = useState('');
  const [decimoTerceiro, setDecimoTerceiro] = useState(true);
  const [ferias, setFerias] = useState(true);

  const calcularSalarioAnual = () => {
    const salarioBase = parseFloat(salarioMensal) || 0;
    const meses = 12;
    let total = salarioBase * meses;
    
    if (decimoTerceiro) total += salarioBase;
    if (ferias) total += salarioBase + (salarioBase / 3); // Salário + 1/3 de férias

    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cálculo de Salário Anual</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salário Mensal
          </label>
          <input
            type="number"
            value={salarioMensal}
            onChange={(e) => setSalarioMensal(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Digite o valor do salário mensal"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={decimoTerceiro}
              onChange={(e) => setDecimoTerceiro(e.target.checked)}
              className="mr-2"
            />
            <label>Incluir 13º Salário</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={ferias}
              onChange={(e) => setFerias(e.target.checked)}
              className="mr-2"
            />
            <label>Incluir Férias (com 1/3)</label>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-lg font-semibold">Salário Anual Total:</p>
          <p className="text-2xl text-blue-600">{calcularSalarioAnual()}</p>
        </div>
      </div>
    </div>
  );
}