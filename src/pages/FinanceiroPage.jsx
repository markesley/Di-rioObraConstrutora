import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, DollarSign, FileDown } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  contasPagar,
  contasReceber,
  custosPorObra,
  financeiroKpis,
  fluxoCaixa,
  obras,
  relatoriosFinanceiros,
} from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function FinanceiroPage({ userProfile }) {
  const [obraFiltro, setObraFiltro] = useState('todas');
  const [statusFiltro, setStatusFiltro] = useState('todos');

  const pagarFiltrado = useMemo(
    () =>
      contasPagar.filter(
        (item) =>
          (obraFiltro === 'todas' || item.obraId === Number(obraFiltro)) &&
          (statusFiltro === 'todos' || item.status === statusFiltro),
      ),
    [obraFiltro, statusFiltro],
  );

  const receberFiltrado = useMemo(
    () =>
      contasReceber.filter(
        (item) =>
          (obraFiltro === 'todas' || item.obraId === Number(obraFiltro)) &&
          (statusFiltro === 'todos' || item.status === statusFiltro),
      ),
    [obraFiltro, statusFiltro],
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Módulo Financeiro</h1>
          <p>Controle completo de entradas, saídas, custos por obra e lucratividade integrada com execução.</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select" value={obraFiltro} onChange={(event) => setObraFiltro(event.target.value)}>
            <option value="todas">Todas as obras</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nome}
              </option>
            ))}
          </select>
          <select className="filter-select" value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)}>
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
            <option value="atrasado">Atrasado</option>
            <option value="recebido">Recebido</option>
          </select>
          <button className="btn btn-outline">
            <FileDown size={16} /> Exportar PDF/Excel
          </button>
        </div>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon green">
            <ArrowUpCircle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Receita Total</div>
            <div className="value">{formatCurrency(financeiroKpis.receitaTotal)}</div>
            <div className="change positive">Entradas consolidadas</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon red">
            <ArrowDownCircle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Despesas Totais</div>
            <div className="value">{formatCurrency(financeiroKpis.despesasTotais)}</div>
            <div className="change negative">Saídas operacionais</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon blue">
            <DollarSign size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Lucro Líquido</div>
            <div className="value">{formatCurrency(financeiroKpis.lucroLiquido)}</div>
            <div className={financeiroKpis.lucroLiquido >= 0 ? 'change positive' : 'change negative'}>
              {financeiroKpis.lucroLiquido >= 0 ? 'Resultado positivo' : 'Resultado negativo'}
            </div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon amber">
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Contas Vencidas</div>
            <div className="value">{financeiroKpis.contasVencidas}</div>
            <div className="change negative">Prioridade para regularização</div>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-header">
            <h3>Fluxo de Caixa (Entradas x Saídas)</h3>
          </div>
          <div className="card-body">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fluxoCaixa}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="periodo" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="entradas" fill="#22C55E" name="Entradas" />
                  <Bar dataKey="saidas" fill="#EF4444" name="Saídas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Saldo Acumulado</h3>
          </div>
          <div className="card-body">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fluxoCaixa}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="periodo" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="saldo" stroke="#1B2A4A" strokeWidth={3} name="Saldo" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-header">
            <h3>Contas a Pagar</h3>
          </div>
          <div className="card-body no-pad">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Despesa</th>
                    <th>Fornecedor</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pagarFiltrado.map((item) => (
                    <tr key={item.id}>
                      <td>{item.descricao}</td>
                      <td>{item.fornecedor}</td>
                      <td>{item.categoria}</td>
                      <td>{formatCurrency(item.valor)}</td>
                      <td>{formatDate(item.vencimento)}</td>
                      <td>
                        <span className={`badge ${item.status === 'pago' ? 'badge-green' : item.status === 'atrasado' ? 'badge-red' : 'badge-amber'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Contas a Receber</h3>
          </div>
          <div className="card-body no-pad">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Origem</th>
                    <th>Valor</th>
                    <th>Recebimento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {receberFiltrado.map((item) => (
                    <tr key={item.id}>
                      <td>{item.cliente}</td>
                      <td>{item.origem}</td>
                      <td>{formatCurrency(item.valor)}</td>
                      <td>{formatDate(item.recebimento)}</td>
                      <td>
                        <span className={`badge ${item.status === 'recebido' ? 'badge-green' : item.status === 'atrasado' ? 'badge-red' : 'badge-amber'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Orçamento por Obra (Previsto vs Executado)</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Obra</th>
                  <th>Custo Total</th>
                  <th>Valor Recebido</th>
                  <th>Lucro / Prejuízo</th>
                  <th>Financeiro x Físico</th>
                </tr>
              </thead>
              <tbody>
                {custosPorObra
                  .filter((item) => obraFiltro === 'todas' || item.obraId === Number(obraFiltro))
                  .map((item) => (
                    <tr key={item.obraId}>
                      <td>{item.obra}</td>
                      <td>{formatCurrency(item.custoRealizado)}</td>
                      <td>{formatCurrency(item.valorRecebido)}</td>
                      <td>
                        <span className={`badge ${item.lucro >= 0 ? 'badge-green' : 'badge-red'}`}>{formatCurrency(item.lucro)}</span>
                      </td>
                      <td style={{ minWidth: 220 }}>
                        <div className="table-muted">Financeiro: {item.percentualFinanceiro}% | Físico: {item.percentualFisico}%</div>
                        <div className="progress-bar-container" style={{ marginTop: '.35rem' }}>
                          <div className="progress-bar-fill blue" style={{ width: `${item.percentualFinanceiro}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: '1rem' }}>
        <div className="card-header">
          <h3>Relatórios Financeiros</h3>
        </div>
        <div className="card-body">
          {relatoriosFinanceiros.map((rel) => (
            <div className="task-item" key={rel.id}>
              <div className="task-content">
                <div className="title">{rel.nome}</div>
                <div className="meta">
                  <span>Formato: {rel.tipo}</span>
                  <span>Atualizado: {formatDate(rel.atualizado)}</span>
                </div>
              </div>
              <button className="btn btn-sm btn-outline">Exportar</button>
            </div>
          ))}
          {userProfile === 'operador' && <p className="table-muted">Perfil Operador com visualização financeira em modo leitura.</p>}
        </div>
      </section>
    </div>
  );
}
