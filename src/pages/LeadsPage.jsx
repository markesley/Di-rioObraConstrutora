import { Eye, PhoneCall } from 'lucide-react';
import { leads } from '../data/mockData';
import { formatCurrency, formatDate, getLeadStatus } from '../utils/formatters';

const stages = ['novo', 'em_contato', 'proposta', 'negociacao', 'convertido', 'perdido'];

export default function LeadsPage({ userProfile }) {
  if (userProfile === 'operador') {
    return (
      <div className="card">
        <div className="card-body empty-state">
          <div className="icon">🔒</div>
          <h3>Acesso restrito ao perfil Gerente</h3>
          <p>O módulo comercial de leads captados está disponível apenas para gestores administrativos.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Leads Captados</h1>
          <p>Acompanhe oportunidades comerciais, estágio no funil e potencial de receita.</p>
        </div>
      </div>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-header">
          <h3>Funil de Conversão</h3>
        </div>
        <div className="card-body">
          <div className="funnel">
            {stages.map((stage) => {
              const stageLeads = leads.filter((lead) => lead.status === stage);
              return (
                <div className="funnel-stage" key={stage}>
                  <div className={`funnel-stage-header ${stage}`}>
                    {getLeadStatus(stage).label} ({stageLeads.length})
                  </div>
                  <div className="funnel-stage-body">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="funnel-card">
                        <div className="name">{lead.nome}</div>
                        <div className="interest">{lead.interesse}</div>
                        <div className="interest">{formatCurrency(lead.valor)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Lista de Leads</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Contato</th>
                  <th>Origem</th>
                  <th>Status</th>
                  <th>Interesse</th>
                  <th>Data de Entrada</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const status = getLeadStatus(lead.status);
                  return (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.nome}</strong>
                        <div className="table-muted">{lead.email}</div>
                      </td>
                      <td>{lead.contato}</td>
                      <td>{lead.origem}</td>
                      <td>
                        <span className={`badge ${status.badge}`}>{status.label}</span>
                      </td>
                      <td>{lead.interesse}</td>
                      <td>{formatDate(lead.dataEntrada)}</td>
                      <td>
                        <div className="actions-row">
                          <button className="btn-icon" title="Visualizar">
                            <Eye size={16} />
                          </button>
                          <button className="btn-icon" title="Contato">
                            <PhoneCall size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
