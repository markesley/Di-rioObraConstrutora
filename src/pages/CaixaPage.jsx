import { useMemo, useState } from 'react';
import { AlertTriangle, Clock3, Wallet } from 'lucide-react';
import { caixaResumo, movimentosCaixa } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

export default function CaixaPage() {
  const [periodo, setPeriodo] = useState('dia');
  const [responsavel, setResponsavel] = useState('todos');

  const responsaveis = [...new Set(movimentosCaixa.map((movimento) => movimento.responsavel))];
  const movimentos = useMemo(
    () => movimentosCaixa.filter((movimento) => responsavel === 'todos' || movimento.responsavel === responsavel),
    [responsavel],
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Módulo de Caixa (Tesouraria)</h1>
          <p>Tela operacional para abertura/fechamento de caixa, entradas, saídas e controle de inconsistências.</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select" value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
            <option value="dia">Dia</option>
            <option value="semana">Semana</option>
            <option value="mes">Mês</option>
          </select>
          <select className="filter-select" value={responsavel} onChange={(event) => setResponsavel(event.target.value)}>
            <option value="todos">Todos responsáveis</option>
            {responsaveis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="btn btn-primary">Registrar movimentação</button>
        </div>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon blue">
            <Wallet size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Saldo Inicial</div>
            <div className="value">{formatCurrency(caixaResumo.saldoInicial)}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon green">
            <Wallet size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Saldo Atual</div>
            <div className="value">{formatCurrency(caixaResumo.saldoAtual)}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon amber">
            <Clock3 size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Saldo Final Previsto</div>
            <div className="value">{formatCurrency(caixaResumo.saldoFinalPrevisto)}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon red">
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Alertas de Inconsistência</div>
            <div className="value">{caixaResumo.inconsistencias}</div>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Movimentações em Tempo Real ({periodo})</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Obra</th>
                  <th>Responsável</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {movimentos.map((movimento) => (
                  <tr key={movimento.id}>
                    <td>{movimento.data}</td>
                    <td>
                      <span className={`badge ${movimento.tipo === 'entrada' ? 'badge-green' : movimento.tipo === 'saida' ? 'badge-red' : 'badge-blue'}`}>
                        {movimento.tipo}
                      </span>
                    </td>
                    <td>{movimento.descricao}</td>
                    <td>{movimento.obra}</td>
                    <td>{movimento.responsavel}</td>
                    <td>{formatCurrency(movimento.valor)}</td>
                    <td>
                      <span className={`badge ${movimento.status === 'ok' ? 'badge-green' : 'badge-red'}`}>{movimento.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
