import { useState } from 'react';
import { BarChart3, Building2, Download, FileCog, Layers3, ListChecks, Plus, Settings, ShieldCheck, Users2 } from 'lucide-react';
import { cadastrosGerais, clientes, etapasCatalogo, servicosCatalogo, users } from '../data/mockData';

const modules = [
  { id: 'usuarios', title: 'Gerenciamento de Usuários', icon: Users2, description: 'Cadastro de usuários, bloqueio e redefinição de acesso.' },
  { id: 'permissoes', title: 'Permissões por Perfil', icon: ShieldCheck, description: 'Controle de permissões por função e módulo.' },
  { id: 'cadastros', title: 'Cadastros de Obras e Clientes', icon: Building2, description: 'Base contratual e organizacional de obras e clientes.' },
  { id: 'servicos', title: 'Cadastro de Serviços e Etapas', icon: ListChecks, description: 'Serviços padronizados e etapas com impacto no progresso.' },
  { id: 'cadastros-gerais', title: 'Cadastros Gerais', icon: Layers3, description: 'Tipos de custo, unidades, pagamentos, cargos e grupos.' },
  { id: 'relatorios', title: 'Relatórios e Exportações', icon: BarChart3, description: 'Exportação de dados para diretoria e auditoria.' },
  { id: 'config', title: 'Configurações do Sistema', icon: Settings, description: 'Parâmetros gerais da plataforma e integrações.' },
];

export default function AdminPage({ userProfile }) {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [showModal, setShowModal] = useState(false);

  if (userProfile === 'operador') {
    return (
      <div className="card">
        <div className="card-body empty-state">
          <div className="icon">🔒</div>
          <h3>Acesso somente para Gerente (Admin)</h3>
          <p>Este módulo possui funções administrativas e de governança com perfil autorizado.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Área Administrativa</h1>
          <p>Painel de configuração corporativa para gestão de usuários, permissões, cadastros e relatórios.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline">
            <Download size={16} /> Exportar dados
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Novo cadastro
          </button>
        </div>
      </div>

      <section className="grid-3">
        {modules.map((module) => (
          <article key={module.id} className="admin-card" onClick={() => setActiveTab(module.id)}>
            <div className="admin-card-icon" style={{ backgroundColor: module.id === activeTab ? '#1B2A4A' : '#F8FAFC', color: module.id === activeTab ? '#fff' : '#1B2A4A' }}>
              <module.icon />
            </div>
            <div>
              <h4>{module.title}</h4>
              <p>{module.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Detalhes do Módulo</h3>
        </div>
        <div className="card-body">
          <div className="tabs">
            {modules.map((module) => (
              <button key={module.id} className={`tab ${activeTab === module.id ? 'active' : ''}`} onClick={() => setActiveTab(module.id)}>
                {module.title}
              </button>
            ))}
          </div>
          {activeTab === 'usuarios' && <UsersTable />}
          {activeTab === 'permissoes' && <PermissionsPanel />}
          {activeTab === 'cadastros' && <CadastrosPanel />}
          {activeTab === 'servicos' && <ServicesEtapasPanel />}
          {activeTab === 'cadastros-gerais' && <CadastrosGeraisPanel />}
          {activeTab === 'relatorios' && <ReportsPanel />}
          {activeTab === 'config' && <ConfigPanel />}
        </div>
      </section>

      {showModal && <AdminModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function UsersTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>E-mail</th>
            <th>Perfil</th>
            <th>Cargo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>{user.nome}</strong>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.perfil === 'gerente' ? 'badge-blue' : 'badge-amber'}`}>
                  {user.perfil === 'gerente' ? 'Gerente' : 'Operador'}
                </span>
              </td>
              <td>{user.cargo}</td>
              <td>
                <span className="badge badge-green">Ativo</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PermissionsPanel() {
  return (
    <div className="permissions-grid">
      <article className="card permission-card">
        <div className="card-body">
          <h4>Perfil Operador</h4>
          <ul className="simple-list">
            <li>Registrar diário de obra</li>
            <li>Adicionar fotos e evidências</li>
            <li>Visualização das obras atribuídas</li>
            <li>Consulta de progresso em modo leitura</li>
          </ul>
        </div>
      </article>
      <article className="card permission-card">
        <div className="card-body">
          <h4>Perfil Gerente (Admin)</h4>
          <ul className="simple-list">
            <li>Acesso total a todas as obras</li>
            <li>Gestão de etapas e cadastro de obras</li>
            <li>Gestão financeira, estoque e pessoas</li>
            <li>Relatórios analíticos e exportação</li>
          </ul>
        </div>
      </article>
    </div>
  );
}

function CadastrosPanel() {
  return (
    <div className="grid-2">
      <article className="card">
        <div className="card-header">
          <h3>Clientes Cadastrados</h3>
        </div>
        <div className="card-body">
          {clientes.map((cliente) => (
            <div className="task-item" key={cliente.id}>
              <div className="task-content">
                <div className="title">{cliente.nome}</div>
                <div className="meta">
                  <span>{cliente.cnpj}</span>
                  <span>{cliente.contato}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className="card">
        <div className="card-header">
          <h3>Resumo de Estrutura Técnica</h3>
        </div>
        <div className="card-body">
          <ul className="simple-list">
            <li>Serviços padronizados: {servicosCatalogo.length}</li>
            <li>Etapas padronizadas: {etapasCatalogo.length}</li>
            <li>Catálogo integrado com módulo de obras</li>
            <li>Controle de impacto de progresso por etapa</li>
          </ul>
        </div>
      </article>
    </div>
  );
}

function ServicesEtapasPanel() {
  return (
    <div className="grid-2">
      <article className="card">
        <div className="card-header">
          <h3>Cadastro de Serviços</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {servicosCatalogo.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.descricao}</td>
                    <td>{item.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
      <article className="card">
        <div className="card-header">
          <h3>Cadastro de Etapas da Obra</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Ordem</th>
                  <th>Impacto no Progresso</th>
                </tr>
              </thead>
              <tbody>
                {etapasCatalogo.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.ordem}</td>
                    <td>{item.impacto}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  );
}

function CadastrosGeraisPanel() {
  const categorias = [
    { nome: 'Tipos de custo', items: cadastrosGerais.tiposCusto },
    { nome: 'Unidades de medida', items: cadastrosGerais.unidadesMedida },
    { nome: 'Formas de pagamento', items: cadastrosGerais.formasPagamento },
    { nome: 'Frequências', items: cadastrosGerais.frequencias },
    { nome: 'Cargos', items: cadastrosGerais.cargos },
    { nome: 'Especialidades', items: cadastrosGerais.especialidades },
    { nome: 'Grupos', items: cadastrosGerais.grupos },
  ];

  return (
    <div className="grid-3">
      {categorias.map((categoria) => (
        <article className="card" key={categoria.nome}>
          <div className="card-header">
            <h3>{categoria.nome}</h3>
          </div>
          <div className="card-body">
            {categoria.items.map((item) => (
              <div className="task-item" key={item}>
                <div className="task-content">
                  <div className="title">{item}</div>
                </div>
                <div className="actions-row">
                  <button className="btn btn-sm btn-outline">Editar</button>
                  <button className="btn btn-sm btn-secondary">Excluir</button>
                </div>
              </div>
            ))}
            <button className="btn btn-sm btn-primary" style={{ marginTop: '.65rem' }}>
              Criar item
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ReportsPanel() {
  return (
    <div className="reports-grid">
      <article className="card">
        <div className="card-body report-item">
          <FileCog size={20} />
          <div>
            <h4>Relatório de Progresso Físico</h4>
            <p>Consolidado mensal por obra e por etapa.</p>
          </div>
          <button className="btn btn-sm btn-outline">Exportar PDF</button>
        </div>
      </article>
      <article className="card">
        <div className="card-body report-item">
          <BarChart3 size={20} />
          <div>
            <h4>Relatório Financeiro</h4>
            <p>Comparativo orçamento planejado x executado.</p>
          </div>
          <button className="btn btn-sm btn-outline">Exportar XLS</button>
        </div>
      </article>
    </div>
  );
}

function ConfigPanel() {
  return (
    <div className="grid-2">
      <div className="form-group">
        <label>Nome do sistema</label>
        <input value="Sistema de Gestão de Obras e Administrativo" readOnly />
      </div>
      <div className="form-group">
        <label>Empresa</label>
        <input value="Construtora OCCA" readOnly />
      </div>
      <div className="form-group">
        <label>Integração ERP</label>
        <select defaultValue="ativo">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>
      <div className="form-group">
        <label>Notificações por e-mail</label>
        <select defaultValue="habilitado">
          <option value="habilitado">Habilitado</option>
          <option value="desabilitado">Desabilitado</option>
        </select>
      </div>
    </div>
  );
}

function AdminModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Novo Cadastro Administrativo</h3>
          <button className="btn-icon" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Tipo de cadastro</label>
            <select>
              <option>Usuário</option>
              <option>Cliente</option>
              <option>Obra</option>
              <option>Etapa</option>
              <option>Serviço</option>
              <option>Cadastro geral</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nome</label>
            <input placeholder="Informe o nome do cadastro" />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea rows="3" placeholder="Observações e parâmetros iniciais." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
