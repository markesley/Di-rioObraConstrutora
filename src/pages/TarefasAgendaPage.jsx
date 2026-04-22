import { useMemo } from 'react';
import { CalendarClock, Clock3, PlusCircle } from 'lucide-react';
import { agendaEventos, obras, tarefasAgenda } from '../data/mockData';
import { formatDate } from '../utils/formatters';

export default function TarefasAgendaPage({ userProfile }) {
  if (userProfile !== 'gerente') {
    return (
      <div className="card">
        <div className="card-body empty-state">
          <div className="icon">🔒</div>
          <h3>Kanban disponível somente para Gerente</h3>
          <p>Este módulo é exclusivo da visão administrativa para coordenação estratégica das equipes.</p>
        </div>
      </div>
    );
  }

  const kanban = useMemo(
    () => ({
      pendente: tarefasAgenda.filter((item) => item.status === 'pendente'),
      em_andamento: tarefasAgenda.filter((item) => item.status === 'em_andamento'),
      concluido: tarefasAgenda.filter((item) => item.status === 'concluido'),
    }),
    [],
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Controle de Atividades (Gerência)</h1>
          <p>Controle visual das tarefas por estágio com foco em coordenação de obras e agenda executiva.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">
            <PlusCircle size={16} /> Nova tarefa
          </button>
        </div>
      </div>

      <section className="kanban-grid" style={{ marginBottom: '1rem' }}>
        <article className="card kanban-column pendente">
          <div className="card-header kanban-header pendente">
            <h3>Pendente</h3>
          </div>
          <div className="card-body">
            {kanban.pendente.map((task) => {
              const obra = obras.find((item) => item.id === task.obraId);
              return (
                <div key={task.id} className="kanban-card">
                  <div className="kanban-title">{task.titulo}</div>
                  <div className="kanban-meta">
                    <span>{obra?.nome}</span>
                    <span>{task.responsavel}</span>
                    <span><Clock3 size={12} /> {task.horario}</span>
                    <span>{formatDate(task.data)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
        <article className="card kanban-column em-andamento">
          <div className="card-header kanban-header em-andamento">
            <h3>Em Andamento</h3>
          </div>
          <div className="card-body">
            {kanban.em_andamento.map((task) => {
              const obra = obras.find((item) => item.id === task.obraId);
              return (
                <div key={task.id} className="kanban-card">
                  <div className="kanban-title">{task.titulo}</div>
                  <div className="kanban-meta">
                    <span>{obra?.nome}</span>
                    <span>{task.responsavel}</span>
                    <span><Clock3 size={12} /> {task.horario}</span>
                    <span>{formatDate(task.data)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
        <article className="card kanban-column concluido">
          <div className="card-header kanban-header concluido">
            <h3>Concluído</h3>
          </div>
          <div className="card-body">
            {kanban.concluido.map((task) => {
              const obra = obras.find((item) => item.id === task.obraId);
              return (
                <div key={task.id} className="kanban-card">
                  <div className="kanban-title">{task.titulo}</div>
                  <div className="kanban-meta">
                    <span>{obra?.nome}</span>
                    <span>{task.responsavel}</span>
                    <span><Clock3 size={12} /> {task.horario}</span>
                    <span>{formatDate(task.data)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="card">
        <div className="card-header">
          <h3>Agenda da Gerência</h3>
        </div>
        <div className="card-body">
          {agendaEventos.map((evento) => (
            <div key={evento.id} className="task-item">
              <CalendarClock size={16} />
              <div className="task-content">
                <div className="title">{evento.titulo}</div>
                <div className="meta">
                  <span>{formatDate(evento.data)}</span>
                  <span>{evento.periodo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
