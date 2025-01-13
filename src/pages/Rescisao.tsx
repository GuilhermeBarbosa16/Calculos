import React, { useState } from 'react';

export default function Rescisao() {
  const [salarioBase, setSalarioBase] = useState('');
  const [mesesTrabalhados, setMesesTrabalhados] = useState('');
  const [avisoPrevio, setAvisoPrevio] = useState('cumprido');
  const [motivoDemissao, setMotivoDemissao] = useState('sem_justa_causa');
  const [feriasPeriodoAquisitivo, setFeriasPeriodoAquisitivo] = useState('');

  const calcularRescisao = () => {
    const salario = parseFloat(salarioBase) || 0;
    const meses = parseInt(mesesTrabalhados) || 0;
    const feriasProporcional = parseInt(feriasPeriodoAquisitivo) || 0;

    let total = 0;
    const calculos: { descricao: string; valor: number }[] = [];

    // Saldo de salário (proporcional aos dias trabalhados)
    const saldoSalario = salario / 30 * 30; // Exemplo com mês completo
    total += saldoSalario;
    calculos.push({ descricao: 'Saldo de Salário', valor: saldoSalario });

    // 13º Salário proporcional
    const decimoTerceiro = (salario / 12) * (meses % 12);
    total += decimoTerceiro;
    calculos.push({ descricao: '13º Proporcional', valor: decimoTerceiro });

    // Férias proporcionais
    const feriasProp = (salario / 12) * feriasProporcional;
    const tercoFerias = feriasProp / 3;
    total += feriasProp + tercoFerias;
    calculos.push({ descricao: 'Férias Proporcionais + 1/3', valor: feriasProp + tercoFerias });

    if (motivoDemissao === 'sem_justa_causa') {
      // Multa FGTS (40% do total depositado)
      const fgtsTotal = salario * 0.08 * meses;
      const multaFGTS = fgtsTotal * 0.4;
      total += multaFGTS;
      calculos.push({ descricao: 'Multa FGTS (40%)', valor: multaFGTS });

      // Aviso Prévio
      if (avisoPrevio === 'indenizado') {
        const valorAvisoPrevio = salario;
        total += valorAvisoPrevio;
        calculos.push({ descricao: 'Aviso Prévio Indenizado', valor: valorAvisoPrevio });
      }
    }

    return { total, calculos };
  };

  const resultado = calcularRescisao();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cálculo de Rescisão CLT</h2>
      
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
            Meses Trabalhados
          </label>
          <input
            type="number"
            value={mesesTrabalhados}
            onChange={(e) => setMesesTrabalhados(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Quantidade de meses trabalhados"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meses do Período Aquisitivo de Férias
          </label>
          <input
            type="number"
            value={feriasPeriodoAquisitivo}
            onChange={(e) => setFeriasPeriodoAquisitivo(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Meses acumulados para férias"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivo da Demissão
          </label>
          <select
            value={motivoDemissao}
            onChange={(e) => setMotivoDemissao(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="sem_justa_causa">Sem Justa Causa</option>
            <option value="com_justa_causa">Com Justa Causa</option>
            <option value="pedido_demissao">Pedido de Demissão</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aviso Prévio
          </label>
          <select
            value={avisoPrevio}
            onChange={(e) => setAvisoPrevio(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="cumprido">Cumprido</option>
            <option value="indenizado">Indenizado</option>
          </select>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-3">
          <h3 className="font-semibold">Verbas Rescisórias:</h3>
          {resultado.calculos.map((calc, index) => (
            <p key={index}>
              <span className="font-medium">{calc.descricao}:</span>{' '}
              {calc.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          ))}
          <p className="text-lg text-blue-600 font-semibold pt-2 border-t">
            Total da Rescisão:{' '}
            {resultado.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </div>
  );
}