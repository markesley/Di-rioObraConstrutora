import {
  BookOpenText,
  Building2,
  CheckCircle2,
  ClipboardList,
  DollarSign,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { alertas, financeiroKpis, kpis, obras, obrasPorTipo, progressoMensal } from '../data/mockData';
import { formatCurrency, getAlertBadge, getProgressVisual } from '../utils/formatters';

const COLORS = ['#1B2A4A', '#F59E0B', '#22C55E', '#3B82F6'];

export default function DashboardPage({ navigateTo, userProfile }) {
  const obrasAndamento = obras.filter((obra) => obra.status === 'em_andamento');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Painel Executivo de Obras</h1>
          <p>Visão consolidada de produção, desempenho financeiro e alertas operacionais da Construtora OCCA.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => navigateTo('diario-novo')}>
            Registrar Diário
          </button>
          {userProfile === 'gerente' && (
            <button className="btn btn-primary" onClick={() => navigateTo('admin')}>
              Abrir Administração
            </button>
          )}
        </div>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon blue">
            <Building2 size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Total de Obras</div>
            <div className="value">{kpis.totalObras}</div>
            <div className="change positive">+1 nova frente no mês</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon amber">
            <ClipboardList size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Obras em Andamento</div>
            <div className="value">{kpis.obrasAndamento}</div>
            <div className="change negative">2 obras exigem atenção</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Obras Concluídas</div>
            <div className="value">{kpis.obrasConcluidas}</div>
            <div className="change positive">Meta trimestral em 100%</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon red">
            <DollarSign size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Lucro Líquido</div>
            <div className="value">{formatCurrency(financeiroKpis.lucroLiquido)}</div>
            <div className={financeiroKpis.lucroLiquido >= 0 ? 'change positive' : 'change negative'}>
              Indicador financeiro consolidado
            </div>
          </div>
        </article>
      </section>

      <section className="grid-2-1">
        <article className="card">
          <div className="card-header">
            <h3>Progresso Físico Previsto x Realizado</h3>
          </div>
          <div className="card-body">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressoMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="previsto" stroke="#1B2A4A" strokeWidth={3} name="Previsto (%)" />
                  <Line type="monotone" dataKey="realizado" stroke="#F59E0B" strokeWidth={3} name="Realizado (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Alertas Importantes</h3>
          </div>
          <div className="card-body">
            {alertas.slice(0, 4).map((alerta) => {
              const tag = getAlertBadge(alerta.tipo);
              return (
                <div key={alerta.id} className="alert-item">
                  <div className={`alert-dot ${alerta.tipo}`} />
                  <div className="alert-content">
                    <p>{alerta.mensagem}</p>
                    <div className="meta">
                      {alerta.obra} - {alerta.data}
                    </div>
                    <span className={`badge ${tag.badge}`} style={{ marginTop: '0.35rem' }}>
                      {tag.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-header">
            <h3>Distribuição de Obras por Tipo</h3>
          </div>
          <div className="card-body">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={obrasPorTipo} dataKey="quantidade" nameKey="tipo" outerRadius={88} label>
                    {obrasPorTipo.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Saúde Financeira da Operação</h3>
          </div>
          <div className="card-body">
            <div className="chart-responsive">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ nome: 'Orçado', valor: kpis.orcamentoTotal }, { nome: 'Executado', valor: kpis.gastoTotal }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="nome" />
                  <YAxis tickFormatter={(value) => `${Math.round(value / 1000000)}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="valor" fill="#1B2A4A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Obras em Andamento e Indicadores por Status</h3>
          <button className="btn btn-sm btn-outline" onClick={() => navigateTo('obras')}>
            Ver lista completa
          </button>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Obra</th>
                  <th>Responsável</th>
                  <th>Progresso</th>
                  <th>Orçamento</th>
                  <th>Status</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {obrasAndamento.map((obra) => {
                  const visual = getProgressVisual(obra.progresso);
                  return (
                    <tr key={obra.id}>
                      <td>
                        <div>
                          <strong>{obra.nome}</strong>
                          <div className="table-muted">{obra.localizacao}</div>
                        </div>
                      </td>
                      <td>{obra.responsavel}</td>
                      <td style={{ minWidth: 170 }}>
                        <div className="progress-bar-container">
                          <div className={`progress-bar-fill ${visual.tone}`} style={{ width: `${visual.value}%` }} />
                        </div>
                        <div className="table-muted">{visual.value}%</div>
                      </td>
                      <td>{formatCurrency(obra.orcamento)}</td>
                      <td>
                        <span className={`badge ${visual.badge}`}>{visual.label}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => navigateTo('obra-detalhe', obra.id)}>
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {userProfile === 'operador' && (
        <section className="card" style={{ marginTop: '1rem' }}>
          <div className="card-body operator-note">
            <BookOpenText size={18} />
            <span>Perfil Operador: visualização em modo leitura para indicadores estratégicos e dados administrativos.</span>
          </div>
        </section>
      )}
    </div>
  );
}
