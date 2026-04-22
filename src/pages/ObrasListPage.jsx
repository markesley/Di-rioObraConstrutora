import { useMemo, useState } from 'react';
import { Calendar, Eye, FileDown, Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { obras } from '../data/mockData';
import { formatDate, getProgressVisual, normalizeProgress } from '../utils/formatters';

export default function ObrasListPage({ navigateTo, userProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [editingObra, setEditingObra] = useState(null);
  const [filters, setFilters] = useState({
    status: 'todos',
    responsavel: 'todos',
    fase: 'todas',
    busca: '',
  });

  const responsaveis = [...new Set(obras.map((obra) => obra.responsavel))];

  const filteredObras = useMemo(
    () =>
      obras.filter((obra) => {
        const progressoPadrao = normalizeProgress(obra.progresso);
        const statusMatch =
          filters.status === 'todos' ||
          (filters.status === '25' && progressoPadrao === 25) ||
          (filters.status === '50' && progressoPadrao === 50) ||
          (filters.status === '75' && progressoPadrao === 75) ||
          (filters.status === '100' && progressoPadrao === 100);

        const responsavelMatch = filters.responsavel === 'todos' || obra.responsavel === filters.responsavel;
        const faseMatch =
          filters.fase === 'todas' ||
          obra.etapas.some((etapa) => etapa.status === filters.fase) ||
          (filters.fase === 'concluida' && obra.status === 'concluida');
        const buscaMatch = `${obra.nome} ${obra.cliente} ${obra.localizacao}`
          .toLowerCase()
          .includes(filters.busca.toLowerCase());

        return statusMatch && responsavelMatch && faseMatch && buscaMatch;
      }),
    [filters],
  );

  const openCreateModal = () => {
    setEditingObra(null);
    setShowModal(true);
  };

  const openEditModal = (obra) => {
    setEditingObra(obra);
    setShowModal(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Registro de Obras</h1>
          <p>Gestão completa de carteira de obras, com filtros operacionais e ações rápidas.</p>
        </div>
        <div className="page-header-actions">
          {userProfile === 'gerente' && (
            <button className="btn btn-primary" onClick={openCreateModal}>
              <Plus size={16} /> Nova Obra
            </button>
          )}
          <button className="btn btn-outline">
            <FileDown size={16} /> Exportar
          </button>
        </div>
      </div>

      <section className="card">
        <div className="filters-bar">
          <div className="filter-search">
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Buscar por obra, cliente ou localização"
              value={filters.busca}
              onChange={(event) => setFilters({ ...filters, busca: event.target.value })}
            />
          </div>
          <select className="filter-select" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            <option value="todos">Status de Progresso</option>
            <option value="25">25% - Crítica (Vermelho)</option>
            <option value="50">50% - Atenção (Amarelo)</option>
            <option value="75">75% - Controle (Verde)</option>
            <option value="100">100% - Concluída</option>
          </select>
          <select
            className="filter-select"
            value={filters.responsavel}
            onChange={(event) => setFilters({ ...filters, responsavel: event.target.value })}
          >
            <option value="todos">Responsável</option>
            {responsaveis.map((responsavel) => (
              <option key={responsavel} value={responsavel}>
                {responsavel}
              </option>
            ))}
          </select>
          <select className="filter-select" value={filters.fase} onChange={(event) => setFilters({ ...filters, fase: event.target.value })}>
            <option value="todas">Fase da Obra</option>
            <option value="em_andamento">Em andamento</option>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
          </select>
          <button className="btn btn-secondary btn-sm">
            <Filter size={14} /> Filtrar
          </button>
        </div>

        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome da Obra</th>
                  <th>Cliente</th>
                  <th>Localização</th>
                  <th>Responsável</th>
                  <th>Início</th>
                  <th>Progresso</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredObras.map((obra) => {
                  const visual = getProgressVisual(obra.progresso);
                  return (
                    <tr key={obra.id}>
                      <td>
                        <strong>{obra.nome}</strong>
                      </td>
                      <td>{obra.cliente}</td>
                      <td>{obra.localizacao}</td>
                      <td>{obra.responsavel}</td>
                      <td>
                        <div className="inline-icon-text">
                          <Calendar size={14} /> {formatDate(obra.dataInicio)}
                        </div>
                      </td>
                      <td style={{ minWidth: 190 }}>
                        <div className="progress-bar-container">
                          <div className={`progress-bar-fill ${visual.tone}`} style={{ width: `${visual.value}%` }} />
                        </div>
                        <span className="table-muted">{visual.value}%</span>
                      </td>
                      <td>
                        <span className={`badge ${visual.badge}`}>{visual.label}</span>
                      </td>
                      <td>
                        <div className="actions-row">
                          <button className="btn-icon" title="Ver detalhes" onClick={() => navigateTo('obra-detalhe', obra.id)}>
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-icon"
                            title="Editar"
                            onClick={() => openEditModal(obra)}
                            disabled={userProfile === 'operador'}
                          >
                            <Pencil size={16} />
                          </button>
                          <button className="btn-icon" title="Exportar">
                            <FileDown size={16} />
                          </button>
                          <button className="btn-icon" title="Arquivar" disabled={userProfile === 'operador'}>
                            <Trash2 size={16} />
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

      {showModal && (
        <ObraModal editingObra={editingObra} onClose={() => setShowModal(false)} onSave={() => setShowModal(false)} />
      )}
    </div>
  );
}

function ObraModal({ editingObra, onClose, onSave }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{editingObra ? 'Editar Obra' : 'Cadastrar Nova Obra'}</h3>
          <button className="btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="grid-2">
            <div className="form-group">
              <label>Nome da obra</label>
              <input defaultValue={editingObra?.nome || ''} placeholder="Ex.: Centro Empresarial OCCA Prime" />
            </div>
            <div className="form-group">
              <label>Cliente</label>
              <input defaultValue={editingObra?.cliente || ''} placeholder="Razão social do cliente" />
            </div>
            <div className="form-group">
              <label>Responsável técnico</label>
              <input defaultValue={editingObra?.responsavel || ''} placeholder="Nome do responsável" />
            </div>
            <div className="form-group">
              <label>Data de início</label>
              <input type="date" defaultValue={editingObra?.dataInicio || ''} />
            </div>
          </div>
          <div className="form-group">
            <label>Localização</label>
            <input defaultValue={editingObra?.localizacao || ''} placeholder="Cidade, UF e endereço principal" />
          </div>
          <div className="form-group">
            <label>Observações</label>
            <textarea rows="4" placeholder="Resumo executivo da obra, escopo e informações contratuais." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onSave}>
            Salvar cadastro
          </button>
        </div>
      </div>
    </div>
  );
}
