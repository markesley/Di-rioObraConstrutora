import { ClipboardList, FileText, MapPin, UploadCloud, UserCircle2 } from 'lucide-react';
import fotoCasa1 from '../assets/fotocasa1.png';
import fotoCasa2 from '../assets/fotocasa2.png';
import { custosPorObra, diarioObra, obras } from '../data/mockData';
import { formatCurrency, formatDate, getProgressVisual } from '../utils/formatters';

export default function ObraDetailPage({ obraId, navigateTo }) {
  const obra = obras.find((item) => item.id === obraId) || obras[0];
  const diarioAtual = diarioObra.filter((item) => item.obraId === obra.id);
  const financeiroObra = custosPorObra.find((item) => item.obraId === obra.id);
  const visual = getProgressVisual(obra.progresso);

  return (
    <div>
      <div className="detail-header">
        <div>
          <h1>{obra.nome}</h1>
          <p>{obra.descricao}</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline" onClick={() => navigateTo('obras')}>
            Voltar para Obras
          </button>
          <button className="btn btn-primary" onClick={() => navigateTo('diario-novo')}>
            Novo Registro Diário
          </button>
        </div>
      </div>

      <section className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-body">
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <div className="label">Cliente</div>
              <div className="value">{obra.cliente}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Localização</div>
              <div className="value">{obra.localizacao}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Responsável</div>
              <div className="value">{obra.responsavel}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Início</div>
              <div className="value">{formatDate(obra.dataInicio)}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Previsão de término</div>
              <div className="value">{formatDate(obra.previsaoTermino)}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Orçamento</div>
              <div className="value">{formatCurrency(obra.orcamento)}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Gasto Atual</div>
              <div className="value">{formatCurrency(obra.gastoAtual)}</div>
            </div>
            <div className="detail-info-item">
              <div className="label">Status de progresso</div>
              <div className="value">
                <span className={`badge ${visual.badge}`}>{visual.label}</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div className="progress-label">
              <span>Avanço físico da obra</span>
              <strong>{visual.value}%</strong>
            </div>
            <div className="progress-bar-container">
              <div className={`progress-bar-fill ${visual.tone}`} style={{ width: `${visual.value}%` }} />
            </div>
          </div>
        </div>
      </section>

      {financeiroObra && (
        <section className="card" style={{ marginBottom: '1rem' }}>
          <div className="card-header">
            <h3>Integração Financeira da Obra</h3>
          </div>
          <div className="card-body">
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <div className="label">Custo total</div>
                <div className="value">{formatCurrency(financeiroObra.custoRealizado)}</div>
              </div>
              <div className="detail-info-item">
                <div className="label">Valor recebido</div>
                <div className="value">{formatCurrency(financeiroObra.valorRecebido)}</div>
              </div>
              <div className="detail-info-item">
                <div className="label">Lucro / prejuízo</div>
                <div className="value">
                  <span className={`badge ${financeiroObra.lucro >= 0 ? 'badge-green' : 'badge-red'}`}>
                    {formatCurrency(financeiroObra.lucro)}
                  </span>
                </div>
              </div>
              <div className="detail-info-item">
                <div className="label">Financeiro vs físico</div>
                <div className="value">{financeiroObra.percentualFinanceiro}% x {visual.value}%</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="grid-2-1">
        <article className="card">
          <div className="card-header">
            <h3>Etapas da Obra e Linha do Tempo</h3>
          </div>
          <div className="card-body">
            <div className="timeline">
              {obra.etapas.map((etapa) => {
                const visualEtapa = getProgressVisual(etapa.progresso);
                return (
                  <div className="timeline-item" key={etapa.id}>
                    <div className={`timeline-dot ${etapa.status}`}></div>
                    <div className="timeline-content">
                      <h4>{etapa.nome}</h4>
                      <p>
                        {formatDate(etapa.inicio)} até {formatDate(etapa.fim)}
                      </p>
                      <div className="progress-label" style={{ marginTop: '.5rem' }}>
                        <span>Avanço da etapa</span>
                        <strong>{visualEtapa.value}%</strong>
                      </div>
                      <div className="progress-bar-container">
                        <div className={`progress-bar-fill ${visualEtapa.tone}`} style={{ width: `${visualEtapa.value}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Tarefas Pendentes</h3>
          </div>
          <div className="card-body">
            {obra.tarefasPendentes.length === 0 ? (
              <div className="empty-state">
                <div className="icon">✅</div>
                <h3>Sem tarefas pendentes</h3>
                <p>Esta obra está com as entregas atualizadas.</p>
              </div>
            ) : (
              obra.tarefasPendentes.map((task) => (
                <div className="task-item" key={task.id}>
                  <span className={`task-priority ${task.prioridade}`} />
                  <div className="task-content">
                    <div className="title">{task.tarefa}</div>
                    <div className="meta">
                      <span>
                        <UserCircle2 size={13} /> {task.responsavel}
                      </span>
                      <span>Prazo: {formatDate(task.prazo)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-header">
            <h3>Fotos e Evidências</h3>
          </div>
          <div className="card-body">
            <div className="photo-grid">
              {[
                { id: 1, src: fotoCasa1, label: 'Fachada frontal - vistoria' },
                { id: 2, src: fotoCasa2, label: 'Andamento da estrutura' },
                { id: 3, src: fotoCasa1, label: 'Instalações em execução' },
                { id: 4, src: fotoCasa2, label: 'Acabamento e conferência' },
              ].map((item) => (
                <div className="photo-item filled photo-preview" key={item.id}>
                  <img src={item.src} alt={item.label} className="photo-thumb" />
                  <span>{item.label}</span>
                </div>
              ))}
              <div className="photo-item">
                <UploadCloud size={20} />
                Adicionar foto
              </div>
            </div>
            <div className="upload-area" style={{ marginTop: '1rem' }}>
              <div className="icon">
                <UploadCloud />
              </div>
              <p>
                Arraste imagens e documentos aqui ou <span>clique para upload</span>
              </p>
            </div>
          </div>
        </article>
        <article className="card">
          <div className="card-header">
            <h3>Diário de Obra e Histórico</h3>
          </div>
          <div className="card-body">
            {diarioAtual.slice(0, 3).map((registro) => (
              <div className="timeline-item" key={registro.id}>
                <div className="timeline-content">
                  <h4>
                    <ClipboardList size={14} /> Registro de {formatDate(registro.data)}
                  </h4>
                  <p>
                    Clima: {registro.clima} ({registro.temperatura}) | Equipe: {registro.equipePresenteQtd} profissionais
                  </p>
                  <p>
                    <FileText size={14} /> {registro.observacoes}
                  </p>
                </div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm" onClick={() => navigateTo('diario')}>
              Ver histórico completo
            </button>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Responsáveis pela Execução</h3>
        </div>
        <div className="card-body">
          <div className="team-grid">
            {obra.equipe.map((membro) => (
              <div key={membro} className="team-card">
                <UserCircle2 size={18} />
                <strong>{membro}</strong>
                <span>
                  <MapPin size={12} /> Canteiro principal
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
