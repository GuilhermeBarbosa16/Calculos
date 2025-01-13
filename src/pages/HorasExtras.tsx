import React, { useState } from 'react';

export default function HorasExtras() {
  const [salarioBase, setSalarioBase] = useState('');
  const [horasNormais, setHorasNormais] = useState('220');
  const [horasExtras50, setHorasExtras50] = useState('');
  const [horasExtras100, setHorasExtras100] = useState('');

  const calcularHorasExtras = () => {
    const salario = parseFloat(salarioBase) || 0;
    const valorHoraNormal = salario / parseFloat(horasNormais);
    
    const extras50 = parseFloat(horasExtras50) || 0;
    const extras100 = parseFloat(horasExtras100) || 0;
    
    const valorExtras50 = (valorHoraNormal * 1.5) * extras50;
    const valorExtras100 = (valorHoraNormal * 2) * extras100;
    
    return {
      valorHoraNormal: valorHoraNormal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      totalExtras50: valorExtras50.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      totalExtras100: valorExtras100.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      total: (valorExtras50 + valorExtras100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    };
  };

  const resultado = calcularHorasExtras();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cálculo de Horas Extras</h2>
      
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horas Mensais Normais
          </label>
          <input
            type="number"
            value={horasNormais}
            onChange={(e) => setHorasNormais(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horas Extras 50%
          </label>
          <input
            type="number"
            value={horasExtras50}
            onChange={(e) => setHorasExtras50(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Quantidade de horas extras (50%)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horas Extras 100%
          </label>
          <input
            type="number"
            value={horasExtras100}
            onChange={(e) => setHorasExtras100(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Quantidade de horas extras (100%)"
          />
        </div>

        <div className="mt-6 space-y-3 p-4 bg-gray-50 rounded-md">
          <p className="text-sm">
            <span className="font-semibold">Valor Hora Normal:</span> {resultado.valorHoraNormal}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Total Horas Extras 50%:</span> {resultado.totalExtras50}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Total Horas Extras 100%:</span> {resultado.totalExtras100}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Total de Horas Extras: {resultado.total}
          </p>
        </div>
      </div>
    </div>
  );
}