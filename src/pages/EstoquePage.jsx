import { useMemo, useState } from 'react';
import { AlertTriangle, Boxes, MoveRight, Warehouse } from 'lucide-react';
import { materiais, movimentacoesEstoque } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

export default function EstoquePage() {
  const [categoria, setCategoria] = useState('todas');
  const [obra, setObra] = useState('todas');
  const [showBaixaModal, setShowBaixaModal] = useState(false);
  const [materialId, setMaterialId] = useState(materiais[0]?.id || 1);
  const [quantidadeBaixa, setQuantidadeBaixa] = useState(1);
  const [destinoObra, setDestinoObra] = useState(materiais[0]?.obra || 'Central');
  const [materiaisData, setMateriaisData] = useState(materiais);
  const [movimentosData, setMovimentosData] = useState(movimentacoesEstoque);

  const categorias = [...new Set(materiaisData.map((item) => item.categoria))];
  const obras = [...new Set(materiaisData.map((item) => item.obra))];

  const lista = useMemo(
    () =>
      materiaisData.filter(
        (item) =>
          (categoria === 'todas' || item.categoria === categoria) &&
          (obra === 'todas' || item.obra === obra),
      ),
    [categoria, obra, materiaisData],
  );

  const criticos = materiaisData.filter((item) => item.status === 'critico').length;
  const baixos = materiaisData.filter((item) => item.status === 'baixo').length;

  const registrarBaixa = () => {
    const qtd = Number(quantidadeBaixa);
    if (!qtd || qtd <= 0) return;

    const materialSelecionado = materiaisData.find((item) => item.id === Number(materialId));
    if (!materialSelecionado) return;

    setMateriaisData((prev) =>
      prev.map((item) => {
        if (item.id !== Number(materialId)) return item;
        const novaQtd = Math.max(0, item.quantidade - qtd);
        const novoStatus = novaQtd <= 20 ? 'critico' : novaQtd <= 150 ? 'baixo' : 'normal';
        return { ...item, quantidade: novaQtd, status: novoStatus };
      }),
    );

    setMovimentosData((prev) => [
      {
        id: Date.now(),
        data: new Date().toISOString().slice(0, 10),
        material: materialSelecionado.nome,
        tipo: 'Baixa para obra',
        quantidade: qtd,
        obra: destinoObra,
      },
      ...prev,
    ]);
    setShowBaixaModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Módulo de Materiais e Estoque</h1>
          <p>Cadastro de materiais, controle de entradas/saídas e monitoramento de consumo por obra.</p>
        </div>
        <div className="page-header-actions">
          <select className="filter-select" value={categoria} onChange={(event) => setCategoria(event.target.value)}>
            <option value="todas">Todas categorias</option>
            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select className="filter-select" value={obra} onChange={(event) => setObra(event.target.value)}>
            <option value="todas">Todas as obras</option>
            {obras.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button className="btn btn-outline" onClick={() => setShowBaixaModal(true)}>
            Dar baixa no estoque
          </button>
          <button className="btn btn-primary">Novo material</button>
        </div>
      </div>

      <section className="kpi-grid">
        <article className="kpi-card">
          <div className="kpi-icon blue">
            <Warehouse size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Itens em Estoque</div>
            <div className="value">{materiaisData.length}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon amber">
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Baixo Estoque</div>
            <div className="value">{baixos}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon red">
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Estoque Crítico</div>
            <div className="value">{criticos}</div>
          </div>
        </article>
        <article className="kpi-card">
          <div className="kpi-icon green">
            <Boxes size={22} />
          </div>
          <div className="kpi-info">
            <div className="label">Movimentações (7 dias)</div>
            <div className="value">{movimentosData.length}</div>
          </div>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <div className="card-header">
            <h3>Saldo de Materiais</h3>
          </div>
          <div className="card-body no-pad">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Categoria</th>
                    <th>Unidade</th>
                    <th>Custo Médio</th>
                    <th>Quantidade Atual</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nome}</td>
                      <td>{item.categoria}</td>
                      <td>{item.unidade}</td>
                      <td>{formatCurrency(item.custoMedio)}</td>
                      <td>{item.quantidade}</td>
                      <td>
                        <span className={`badge ${item.status === 'normal' ? 'badge-green' : item.status === 'baixo' ? 'badge-amber' : 'badge-red'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => {
                          setMaterialId(item.id);
                          setDestinoObra(item.obra);
                          setShowBaixaModal(true);
                        }}>
                          Dar baixa
                        </button>
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
            <h3>Histórico de Uso e Transferência</h3>
          </div>
          <div className="card-body">
            {movimentosData.map((movimento) => (
              <div className="task-item" key={movimento.id}>
                <MoveRight size={16} />
                <div className="task-content">
                  <div className="title">{movimento.material}</div>
                  <div className="meta">
                    <span>{movimento.data}</span>
                    <span>{movimento.tipo}</span>
                    <span>Qtd: {movimento.quantidade}</span>
                    <span>{movimento.obra}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {showBaixaModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Dar Baixa no Estoque</h3>
              <button className="btn-icon" onClick={() => setShowBaixaModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Material</label>
                <select value={materialId} onChange={(event) => setMaterialId(Number(event.target.value))}>
                  {materiaisData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome} (saldo: {item.quantidade} {item.unidade})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade da baixa</label>
                <input
                  type="number"
                  min="1"
                  value={quantidadeBaixa}
                  onChange={(event) => setQuantidadeBaixa(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Obra de destino</label>
                <select value={destinoObra} onChange={(event) => setDestinoObra(event.target.value)}>
                  {obras.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowBaixaModal(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={registrarBaixa}>
                Confirmar baixa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
