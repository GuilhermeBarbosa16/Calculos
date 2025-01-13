import React, { useState } from 'react';

export default function SeguroDesemprego() {
  const [mesesTrabalhados, setMesesTrabalhados] = useState('');
  const [ultimosSalarios, setUltimosSalarios] = useState(['', '', '']);
  
  const verificarElegibilidade = () => {
    const meses = parseInt(mesesTrabalhados) || 0;
    return meses >= 12;
  };

  const calcularParcelas = () => {
    const meses = parseInt(mesesTrabalhados) || 0;
    if (meses < 12) return 0;
    if (meses >= 12 && meses < 24) return 4;
    if (meses >= 24) return 5;
    return 0;
  };

  const calcularValorParcela = () => {
    const salarios = ultimosSalarios
      .map(s => parseFloat(s) || 0)
      .filter(s => s > 0);
    
    if (salarios.length === 0) return 0;
    
    const media = salarios.reduce((a, b) => a + b) / salarios.length;
    
    // Faixas de cálculo do seguro-desemprego (valores de 2024)
    if (media <= 2041.39) {
      return media * 0.8;
    } else if (media <= 3402.65) {
      return (2041.39 * 0.8) + ((media - 2041.39) * 0.5);
    } else {
      return 2313.74; // Valor máximo do benefício
    }
  };

  const elegivel = verificarElegibilidade();
  const numeroParcelas = calcularParcelas();
  const valorParcela = calcularValorParcela();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cálculo do Seguro-Desemprego</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meses Trabalhados
          </label>
          <input
            type="number"
            value={mesesTrabalhados}
            onChange={(e) => setMesesTrabalhados(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Digite o número de meses trabalhados"
          />
        </div>

        <div className="space-y-3">
          <p className="font-medium">Últimos 3 Salários:</p>
          {ultimosSalarios.map((salario, index) => (
            <input
              key={index}
              type="number"
              value={salario}
              onChange={(e) => {
                const newSalarios = [...ultimosSalarios];
                newSalarios[index] = e.target.value;
                setUltimosSalarios(newSalarios);
              }}
              className="w-full p-2 border rounded-md"
              placeholder={`${index + 1}º Salário`}
            />
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-3">
          <p className="text-lg">
            <span className="font-semibold">Situação:</span>{' '}
            {elegivel ? (
              <span className="text-green-600">Elegível para o benefício</span>
            ) : (
              <span className="text-red-600">Não elegível para o benefício</span>
            )}
          </p>
          {elegivel && (
            <>
              <p>
                <span className="font-semibold">Número de Parcelas:</span>{' '}
                {numeroParcelas}
              </p>
              <p>
                <span className="font-semibold">Valor da Parcela:</span>{' '}
                {valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="text-blue-600 font-semibold">
                Total do Benefício:{' '}
                {(valorParcela * numeroParcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}