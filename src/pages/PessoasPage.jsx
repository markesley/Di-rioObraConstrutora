import { useMemo, useState } from 'react';
import { FileClock, UserPlus, UsersRound } from 'lucide-react';
import { obras, pessoas } from '../data/mockData';

export default function PessoasPage() {
  const [tipo, setTipo] = useState('todos');
  const [obra, setObra] = useState('todas');

  const lista = useMemo(
    () =>
      pessoas.filter(
        (item) =>
          (tipo === 'todos' || item.tipo === tipo) &&
          (obra === 'todas' || item.obraId === Number(obra)),
      ),
    [tipo, obra],
  );

  const tipos = [...new Set(pessoas.map((item) => item.tipo))];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Gestão de Pessoas</h1>
          <p>Cadastro unificado de clientes, usuários, profissionais e funcionários com vínculo às obras.</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select" value={tipo} onChange={(event) => setTipo(event.target.value)}>
            <option value="todos">Todos os tipos</option>
            {tipos.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select className="filter-select" value={obra} onChange={(event) => setObra(event.target.value)}>
            <option value="todas">Todas as obras</option>
            {obras.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
          <button className="btn btn-primary">
            <UserPlus size={16} /> Nova pessoa
          </button>
        </div>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon blue">
            <UsersRound size={20} />
          </div>
          <div className="kpi-info">
            <div className="label">Total de pessoas</div>
            <div className="value">{pessoas.length}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon amber">
            <UsersRound size={20} />
          </div>
          <div className="kpi-info">
            <div className="label">Profissionais ativos</div>
            <div className="value">{pessoas.filter((item) => item.tipo.includes('Profissional') || item.tipo === 'Funcionário').length}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon green">
            <FileClock size={20} />
          </div>
          <div className="kpi-info">
            <div className="label">Vínculos com obras</div>
            <div className="value">{pessoas.filter((item) => item.obraId).length}</div>
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Cadastro Unificado</h3>
        </div>
        <div className="card-body no-pad">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF/CNPJ</th>
                  <th>Contato</th>
                  <th>Tipo</th>
                  <th>Cargo</th>
                  <th>Especialidade</th>
                  <th>Grupo</th>
                  <th>Obra</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.documento}</td>
                    <td>{item.contato}</td>
                    <td>
                      <span className={`badge ${item.tipo === 'Cliente' ? 'badge-blue' : item.tipo === 'Usuário do sistema' ? 'badge-amber' : 'badge-green'}`}>
                        {item.tipo}
                      </span>
                    </td>
                    <td>{item.cargo}</td>
                    <td>{item.especialidade}</td>
                    <td>{item.grupo}</td>
                    <td>{obras.find((obraRef) => obraRef.id === item.obraId)?.nome || '-'}</td>
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
