import { useEffect, useMemo, useState } from 'react';
import { Calendar, CloudSun, ImagePlus, Plus } from 'lucide-react';
import fotoCasa1 from '../assets/fotocasa1.png';
import fotoCasa2 from '../assets/fotocasa2.png';
import { diarioObra, obras } from '../data/mockData';
import { formatDate } from '../utils/formatters';

export default function DiarioObraPage({ userProfile, initialShowForm = false }) {
  const [selectedObra, setSelectedObra] = useState('todas');
  const [showForm, setShowForm] = useState(initialShowForm);

  useEffect(() => {
    setShowForm(initialShowForm);
  }, [initialShowForm]);

  const registros = useMemo(
    () =>
      diarioObra.filter((registro) => selectedObra === 'todas' || registro.obraId === Number(selectedObra)),
    [selectedObra],
  );

  return (
    <div className="diary-page">
      <div className="page-header">
        <div>
          <h1>Diário de Obra</h1>
          <p>Registro cronológico de clima, equipe, atividades, materiais e ocorrências do canteiro.</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select" value={selectedObra} onChange={(event) => setSelectedObra(event.target.value)}>
            <option value="todas">Todas as obras</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nome}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={() => setShowForm((value) => !value)}>
            <Plus size={16} /> {showForm ? 'Fechar formulário' : 'Novo Registro'}
          </button>
        </div>
      </div>

      {showForm && (
        <section className="card diary-form-card" style={{ marginBottom: '1rem' }}>
          <div className="card-header">
            <h3>Novo Registro Diário</h3>
          </div>
          <div className="card-body">
            <div className="grid-3">
              <div className="form-group">
                <label>Data</label>
                <input type="date" defaultValue="2026-04-21" />
              </div>
              <div className="form-group">
                <label>Clima</label>
                <select defaultValue="ensolarado">
                  <option value="ensolarado">Ensolarado</option>
                  <option value="nublado">Nublado</option>
                  <option value="chuvoso">Chuvoso</option>
                </select>
              </div>
              <div className="form-group">
                <label>Equipe presente</label>
                <input placeholder="Qtd. de profissionais" />
              </div>
            </div>
            <div className="form-group">
              <label>Atividades executadas</label>
              <textarea rows="3" placeholder="Descreva as atividades do dia..." />
            </div>
            <div className="form-group">
              <label>Materiais utilizados</label>
              <textarea rows="2" placeholder="Concreto, aço, blocos, tubulação..." />
            </div>
            <div className="form-group">
              <label>Ocorrências e observações</label>
              <textarea rows="3" placeholder="Informe atrasos, desvios, incidentes e observações." />
            </div>
            <div className="upload-area">
              <div className="icon">
                <ImagePlus />
              </div>
              <p>
                Upload de fotos e evidências: <span>selecione arquivos</span>
              </p>
            </div>
            <div className="diary-photo-preview-grid" style={{ marginTop: '.9rem' }}>
              {[fotoCasa1, fotoCasa2].map((foto, index) => (
                <div key={index} className="diary-photo-preview">
                  <img src={foto} alt={`Exemplo de evidência ${index + 1}`} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem' }}>
              <button className="btn btn-secondary">Salvar rascunho</button>
              <button className="btn btn-primary">Publicar registro</button>
            </div>
          </div>
        </section>
      )}

      <section className="card diary-history-card">
        <div className="card-header">
          <h3>Histórico Cronológico de Registros</h3>
        </div>
        <div className="card-body">
          {registros.map((registro) => {
            const obra = obras.find((item) => item.id === registro.obraId);
            const climaClass = getClimaClass(registro.clima);
            return (
              <article className={`diary-entry ${climaClass}`} key={registro.id}>
                <header className="diary-header">
                  <div className="date">
                    <Calendar size={16} /> {formatDate(registro.data)} - {obra?.nome}
                  </div>
                  <div className="weather">
                    <CloudSun size={16} /> {registro.clima} | {registro.temperatura}
                  </div>
                </header>
                <div className="diary-tags">
                  <span className={`badge ${climaClass === 'clima-chuvoso' ? 'badge-blue' : climaClass === 'clima-nublado' ? 'badge-amber' : 'badge-green'}`}>
                    Clima: {registro.clima}
                  </span>
                  <span className={`badge ${registro.ocorrencias.length > 0 ? 'badge-red' : 'badge-green'}`}>
                    {registro.ocorrencias.length > 0 ? 'Com ocorrências' : 'Sem ocorrências'}
                  </span>
                  <span className="badge badge-gray">Equipe: {registro.equipePresenteQtd}</span>
                </div>
                <div className="diary-photo-preview-grid">
                  {getRegistroPhotos(registro).map((foto, index) => (
                    <div key={`${registro.id}-${index}`} className="diary-photo-preview">
                      <img src={foto} alt={`Foto de evidência ${index + 1}`} />
                    </div>
                  ))}
                </div>

                <div className="diary-section">
                  <h5>Equipe presente ({registro.equipePresenteQtd})</h5>
                  <ul>
                    {registro.equipePresente.map((equipe) => (
                      <li key={equipe}>{equipe}</li>
                    ))}
                  </ul>
                </div>
                <div className="diary-section">
                  <h5>Atividades executadas</h5>
                  <ul>
                    {registro.atividades.map((atividade) => (
                      <li key={atividade}>{atividade}</li>
                    ))}
                  </ul>
                </div>
                <div className="diary-section">
                  <h5>Materiais utilizados</h5>
                  <ul>
                    {registro.materiais.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </div>
                {registro.ocorrencias.length > 0 && (
                  <div className="diary-section">
                    <h5>Ocorrências</h5>
                    {registro.ocorrencias.map((ocorrencia) => (
                      <div className="diary-ocorrencia" key={ocorrencia}>
                        {ocorrencia}
                      </div>
                    ))}
                  </div>
                )}
                <div className="diary-section">
                  <h5>Observações</h5>
                  <p>{registro.observacoes}</p>
                </div>
                <div className="diary-footer">
                  <span className="badge badge-blue">{registro.fotos} fotos anexadas</span>
                  <span className="table-muted">Autor: {registro.autor}</span>
                </div>
              </article>
            );
          })}
          {userProfile === 'operador' && <p className="table-muted">Perfil Operador: cadastro operacional liberado, dados estratégicos em leitura.</p>}
        </div>
      </section>
    </div>
  );
}

function getClimaClass(clima) {
  if (clima.toLowerCase().includes('chuv')) return 'clima-chuvoso';
  if (clima.toLowerCase().includes('nublado')) return 'clima-nublado';
  return 'clima-ensolarado';
}

function getRegistroPhotos(registro) {
  if (registro.clima.toLowerCase().includes('chuv')) return [fotoCasa2, fotoCasa1];
  if (registro.clima.toLowerCase().includes('nublado')) return [fotoCasa1, fotoCasa2];
  return [fotoCasa1, fotoCasa2];
}
