// ============================================================
// DADOS MOCKADOS – Sistema de Gestão OCCA Construtora
// ============================================================

export const users = [
  { id: 1, nome: 'Carlos Henrique Silva', email: 'carlos@occa.com.br', perfil: 'gerente', avatar: 'CS', cargo: 'Gerente de Obras' },
  { id: 2, nome: 'Ana Paula Martins', email: 'ana@occa.com.br', perfil: 'gerente', avatar: 'AM', cargo: 'Diretora Administrativa' },
  { id: 3, nome: 'Roberto Souza', email: 'roberto@occa.com.br', perfil: 'operador', avatar: 'RS', cargo: 'Mestre de Obras' },
  { id: 4, nome: 'Fernanda Lima', email: 'fernanda@occa.com.br', perfil: 'operador', avatar: 'FL', cargo: 'Engenheira Civil' },
  { id: 5, nome: 'João Pedro Alves', email: 'joao@occa.com.br', perfil: 'operador', avatar: 'JA', cargo: 'Técnico em Edificações' },
];

export const obras = [
  {
    id: 1,
    nome: 'Residencial Villa Toscana',
    cliente: 'Grupo Investimentos Alfa',
    localizacao: 'Av. Paulista, 1500 – São Paulo/SP',
    responsavel: 'Carlos Henrique Silva',
    dataInicio: '2025-03-15',
    previsaoTermino: '2026-09-30',
    progresso: 72,
    status: 'em_andamento',
    orcamento: 12500000,
    gastoAtual: 8750000,
    tipo: 'Residencial',
    descricao: 'Condomínio residencial de alto padrão com 4 torres, 120 unidades, área de lazer completa e paisagismo projetado.',
    etapas: [
      { id: 1, nome: 'Fundação', progresso: 100, status: 'concluida', inicio: '2025-03-15', fim: '2025-06-20' },
      { id: 2, nome: 'Estrutura', progresso: 100, status: 'concluida', inicio: '2025-06-21', fim: '2025-11-30' },
      { id: 3, nome: 'Alvenaria', progresso: 85, status: 'em_andamento', inicio: '2025-12-01', fim: '2026-03-15' },
      { id: 4, nome: 'Instalações Elétricas', progresso: 60, status: 'em_andamento', inicio: '2026-01-10', fim: '2026-05-20' },
      { id: 5, nome: 'Instalações Hidráulicas', progresso: 55, status: 'em_andamento', inicio: '2026-01-15', fim: '2026-05-25' },
      { id: 6, nome: 'Acabamento', progresso: 20, status: 'em_andamento', inicio: '2026-03-01', fim: '2026-08-30' },
      { id: 7, nome: 'Paisagismo', progresso: 0, status: 'pendente', inicio: '2026-07-01', fim: '2026-09-30' },
    ],
    tarefasPendentes: [
      { id: 1, tarefa: 'Instalar quadros elétricos do Bloco C', responsavel: 'Roberto Souza', prioridade: 'alta', prazo: '2026-04-25' },
      { id: 2, tarefa: 'Concretar laje do 8º andar Bloco D', responsavel: 'Roberto Souza', prioridade: 'alta', prazo: '2026-04-28' },
      { id: 3, tarefa: 'Assentar revestimento cerâmico Bloco A', responsavel: 'Fernanda Lima', prioridade: 'media', prazo: '2026-05-05' },
      { id: 4, tarefa: 'Aprovar projeto de paisagismo', responsavel: 'Carlos Henrique Silva', prioridade: 'baixa', prazo: '2026-05-15' },
    ],
    equipe: ['Roberto Souza', 'Fernanda Lima', 'João Pedro Alves'],
  },
  {
    id: 2,
    nome: 'Edifício Comercial Horizonte',
    cliente: 'Horizonte Empreendimentos Ltda.',
    localizacao: 'Rua XV de Novembro, 800 – Curitiba/PR',
    responsavel: 'Fernanda Lima',
    dataInicio: '2025-08-10',
    previsaoTermino: '2027-02-28',
    progresso: 45,
    status: 'em_andamento',
    orcamento: 28000000,
    gastoAtual: 11200000,
    tipo: 'Comercial',
    descricao: 'Edifício comercial de 22 andares com salas corporativas, auditório, estacionamento subterrâneo e heliponto.',
    etapas: [
      { id: 1, nome: 'Fundação', progresso: 100, status: 'concluida', inicio: '2025-08-10', fim: '2025-12-20' },
      { id: 2, nome: 'Estrutura', progresso: 65, status: 'em_andamento', inicio: '2025-12-21', fim: '2026-08-30' },
      { id: 3, nome: 'Alvenaria', progresso: 20, status: 'em_andamento', inicio: '2026-03-01', fim: '2026-09-15' },
      { id: 4, nome: 'Fachada', progresso: 0, status: 'pendente', inicio: '2026-07-01', fim: '2026-12-30' },
      { id: 5, nome: 'Acabamento Interno', progresso: 0, status: 'pendente', inicio: '2026-09-01', fim: '2027-01-30' },
      { id: 6, nome: 'Entrega', progresso: 0, status: 'pendente', inicio: '2027-02-01', fim: '2027-02-28' },
    ],
    tarefasPendentes: [
      { id: 1, tarefa: 'Concluir pilares do 14º pavimento', responsavel: 'Fernanda Lima', prioridade: 'alta', prazo: '2026-04-22' },
      { id: 2, tarefa: 'Solicitar inspeção de elevadores', responsavel: 'Carlos Henrique Silva', prioridade: 'media', prazo: '2026-05-10' },
    ],
    equipe: ['Fernanda Lima', 'João Pedro Alves'],
  },
  {
    id: 3,
    nome: 'Galpão Logístico PortoLog',
    cliente: 'PortoLog Logística S.A.',
    localizacao: 'Rod. Anhanguera, km 42 – Campinas/SP',
    responsavel: 'Roberto Souza',
    dataInicio: '2026-01-05',
    previsaoTermino: '2026-07-30',
    progresso: 25,
    status: 'em_andamento',
    orcamento: 8500000,
    gastoAtual: 2125000,
    tipo: 'Industrial',
    descricao: 'Galpão logístico de 15.000m² com docas de carga, escritório administrativo e sistema de combate a incêndio.',
    etapas: [
      { id: 1, nome: 'Terraplanagem', progresso: 100, status: 'concluida', inicio: '2026-01-05', fim: '2026-02-15' },
      { id: 2, nome: 'Fundação', progresso: 60, status: 'em_andamento', inicio: '2026-02-16', fim: '2026-04-10' },
      { id: 3, nome: 'Estrutura Metálica', progresso: 10, status: 'em_andamento', inicio: '2026-03-15', fim: '2026-05-30' },
      { id: 4, nome: 'Cobertura', progresso: 0, status: 'pendente', inicio: '2026-05-01', fim: '2026-06-15' },
      { id: 5, nome: 'Piso Industrial', progresso: 0, status: 'pendente', inicio: '2026-05-15', fim: '2026-07-10' },
      { id: 6, nome: 'Acabamento e Entrega', progresso: 0, status: 'pendente', inicio: '2026-07-01', fim: '2026-07-30' },
    ],
    tarefasPendentes: [
      { id: 1, tarefa: 'Finalizar sapatas do setor B', responsavel: 'Roberto Souza', prioridade: 'alta', prazo: '2026-04-20' },
      { id: 2, tarefa: 'Receber peças da estrutura metálica', responsavel: 'Roberto Souza', prioridade: 'alta', prazo: '2026-04-25' },
    ],
    equipe: ['Roberto Souza', 'João Pedro Alves'],
  },
  {
    id: 4,
    nome: 'Residencial Parque das Águas',
    cliente: 'Construtora Aliança',
    localizacao: 'Rua das Flores, 250 – Florianópolis/SC',
    responsavel: 'Carlos Henrique Silva',
    dataInicio: '2024-06-10',
    previsaoTermino: '2026-02-28',
    progresso: 100,
    status: 'concluida',
    orcamento: 9800000,
    gastoAtual: 9650000,
    tipo: 'Residencial',
    descricao: 'Condomínio horizontal com 48 casas, área de lazer, piscina, salão de festas e portaria 24h.',
    etapas: [
      { id: 1, nome: 'Infraestrutura', progresso: 100, status: 'concluida', inicio: '2024-06-10', fim: '2024-10-20' },
      { id: 2, nome: 'Construção das Casas', progresso: 100, status: 'concluida', inicio: '2024-10-21', fim: '2025-08-30' },
      { id: 3, nome: 'Área de Lazer', progresso: 100, status: 'concluida', inicio: '2025-07-01', fim: '2025-12-15' },
      { id: 4, nome: 'Paisagismo', progresso: 100, status: 'concluida', inicio: '2025-11-01', fim: '2026-01-30' },
      { id: 5, nome: 'Entrega', progresso: 100, status: 'concluida', inicio: '2026-02-01', fim: '2026-02-28' },
    ],
    tarefasPendentes: [],
    equipe: ['Carlos Henrique Silva', 'Roberto Souza'],
  },
  {
    id: 5,
    nome: 'Shopping Center Vitória',
    cliente: 'Vitória Malls Administração',
    localizacao: 'Av. Brasil, 3200 – Vitória/ES',
    responsavel: 'Fernanda Lima',
    dataInicio: '2025-11-01',
    previsaoTermino: '2027-12-30',
    progresso: 18,
    status: 'em_andamento',
    orcamento: 85000000,
    gastoAtual: 12750000,
    tipo: 'Comercial',
    descricao: 'Shopping center de grande porte com 200 lojas, praça de alimentação, cinema multiplex e estacionamento para 2.000 veículos.',
    etapas: [
      { id: 1, nome: 'Fundação', progresso: 70, status: 'em_andamento', inicio: '2025-11-01', fim: '2026-04-30' },
      { id: 2, nome: 'Estrutura', progresso: 5, status: 'em_andamento', inicio: '2026-03-01', fim: '2026-12-30' },
      { id: 3, nome: 'Fachada', progresso: 0, status: 'pendente', inicio: '2026-10-01', fim: '2027-05-30' },
      { id: 4, nome: 'Instalações', progresso: 0, status: 'pendente', inicio: '2027-01-01', fim: '2027-08-30' },
      { id: 5, nome: 'Acabamento', progresso: 0, status: 'pendente', inicio: '2027-06-01', fim: '2027-11-30' },
      { id: 6, nome: 'Entrega', progresso: 0, status: 'pendente', inicio: '2027-12-01', fim: '2027-12-30' },
    ],
    tarefasPendentes: [
      { id: 1, tarefa: 'Concluir estacas Hélice Contínua setor Norte', responsavel: 'Fernanda Lima', prioridade: 'alta', prazo: '2026-04-20' },
      { id: 2, tarefa: 'Liberação ambiental da etapa 2', responsavel: 'Carlos Henrique Silva', prioridade: 'alta', prazo: '2026-04-30' },
      { id: 3, tarefa: 'Contratar empresa de fachada', responsavel: 'Ana Paula Martins', prioridade: 'media', prazo: '2026-06-15' },
    ],
    equipe: ['Fernanda Lima', 'Roberto Souza', 'João Pedro Alves'],
  },
  {
    id: 6,
    nome: 'Reforma Hospital Santa Clara',
    cliente: 'Associação Beneficente Santa Clara',
    localizacao: 'Rua da Saúde, 100 – Belo Horizonte/MG',
    responsavel: 'Roberto Souza',
    dataInicio: '2026-02-01',
    previsaoTermino: '2026-08-30',
    progresso: 12,
    status: 'em_andamento',
    orcamento: 4200000,
    gastoAtual: 504000,
    tipo: 'Institucional',
    descricao: 'Reforma e ampliação da ala pediátrica e centro cirúrgico com adequação às normas da Anvisa.',
    etapas: [
      { id: 1, nome: 'Demolição Controlada', progresso: 80, status: 'em_andamento', inicio: '2026-02-01', fim: '2026-03-15' },
      { id: 2, nome: 'Estrutura e Reforço', progresso: 10, status: 'em_andamento', inicio: '2026-03-16', fim: '2026-05-30' },
      { id: 3, nome: 'Instalações Especiais', progresso: 0, status: 'pendente', inicio: '2026-05-01', fim: '2026-07-15' },
      { id: 4, nome: 'Acabamento Hospitalar', progresso: 0, status: 'pendente', inicio: '2026-06-15', fim: '2026-08-15' },
      { id: 5, nome: 'Comissionamento', progresso: 0, status: 'pendente', inicio: '2026-08-01', fim: '2026-08-30' },
    ],
    tarefasPendentes: [
      { id: 1, tarefa: 'Finalizar demolição da ala leste', responsavel: 'Roberto Souza', prioridade: 'alta', prazo: '2026-04-22' },
    ],
    equipe: ['Roberto Souza'],
  },
];

export const diarioObra = [
  {
    id: 1, obraId: 1, data: '2026-04-21', clima: 'Ensolarado', temperatura: '28°C',
    equipePresenteQtd: 45,
    equipePresente: ['Pedreiros (12)', 'Eletricistas (8)', 'Encanadores (6)', 'Serventes (15)', 'Engenheiro (2)', 'Mestre de obras (1)', 'Operador de grua (1)'],
    atividades: ['Concretagem da laje do 7º andar – Bloco B', 'Assentamento de alvenaria 5º e 6º andar – Bloco A', 'Instalação de eletrodutos no 4º andar – Bloco C', 'Teste de pressão na tubulação hidráulica – Bloco A'],
    materiais: ['Concreto usinado: 85m³', 'Blocos cerâmicos: 3.200 un', 'Eletrodutos: 450m', 'Tubos PVC: 120m', 'Argamassa: 2.500kg'],
    ocorrencias: ['Atraso de 40 min na entrega do concreto pela concreteira', 'Necessidade de reforço estrutural no pilar P23 do Bloco B'],
    observacoes: 'Produtividade acima da meta diária. Equipe motivada após reunião matinal.',
    fotos: 4,
    autor: 'Roberto Souza',
  },
  {
    id: 2, obraId: 1, data: '2026-04-20', clima: 'Parcialmente Nublado', temperatura: '25°C',
    equipePresenteQtd: 42,
    equipePresente: ['Pedreiros (12)', 'Eletricistas (6)', 'Encanadores (6)', 'Serventes (14)', 'Engenheiro (2)', 'Mestre de obras (1)', 'Armadores (1)'],
    atividades: ['Montagem de formas para laje do 7º andar – Bloco B', 'Passagem de fiação elétrica no 3º andar – Bloco C', 'Instalação de louças sanitárias no 2º andar – Bloco A'],
    materiais: ['Madeira para formas: 35m³', 'Fios elétricos: 1.200m', 'Louças sanitárias: 24 pçs'],
    ocorrencias: [],
    observacoes: 'Dia produtivo sem intercorrências.',
    fotos: 3,
    autor: 'Roberto Souza',
  },
  {
    id: 3, obraId: 1, data: '2026-04-19', clima: 'Chuvoso', temperatura: '21°C',
    equipePresenteQtd: 28,
    equipePresente: ['Pedreiros (6)', 'Eletricistas (6)', 'Serventes (10)', 'Engenheiro (1)', 'Mestre de obras (1)', 'Pintores (4)'],
    atividades: ['Trabalho interno: pintura e acabamento no 1º andar – Bloco A', 'Instalação de quadros elétricos no térreo – Bloco B', 'Organização do canteiro de obras'],
    materiais: ['Tinta acrílica: 200L', 'Massa corrida: 150kg', 'Quadros elétricos: 6 un'],
    ocorrencias: ['Chuva forte interrompeu atividades externas às 10h30', 'Realocação de equipe para serviços internos'],
    observacoes: 'Devido à chuva, produtividade foi 60% do planejado. Serviços externos reagendados.',
    fotos: 2,
    autor: 'Roberto Souza',
  },
  {
    id: 4, obraId: 2, data: '2026-04-21', clima: 'Nublado', temperatura: '18°C',
    equipePresenteQtd: 60,
    equipePresente: ['Pedreiros (15)', 'Armadores (12)', 'Serventes (20)', 'Engenheiros (3)', 'Mestre de obras (2)', 'Operadores de grua (2)', 'Carpinteiros (6)'],
    atividades: ['Concretagem de laje do 12º pavimento', 'Montagem de armação do 13º pavimento', 'Execução de alvenaria no 8º pavimento'],
    materiais: ['Concreto usinado: 120m³', 'Aço CA-50: 8 ton', 'Blocos de concreto: 5.000 un'],
    ocorrencias: ['Falta de aço prevista para próxima semana – pedido emergencial realizado'],
    observacoes: 'Obra dentro do cronograma. Atenção para recebimento de materiais.',
    fotos: 5,
    autor: 'Fernanda Lima',
  },
  {
    id: 5, obraId: 3, data: '2026-04-21', clima: 'Ensolarado', temperatura: '32°C',
    equipePresenteQtd: 22,
    equipePresente: ['Operadores de máquinas (4)', 'Armadores (6)', 'Serventes (8)', 'Engenheiro (1)', 'Mestre de obras (1)', 'Topógrafo (1)', 'Soldadores (1)'],
    atividades: ['Escavação de sapatas do setor B', 'Armação de blocos de fundação do setor A', 'Locação topográfica da estrutura metálica'],
    materiais: ['Aço CA-60: 3 ton', 'Concreto: 40m³', 'Estacas pré-moldadas: 12 un'],
    ocorrencias: [],
    observacoes: 'Calor intenso. Reforçada a hidratação da equipe. Trabalho encerrado 30 min mais cedo.',
    fotos: 3,
    autor: 'Roberto Souza',
  },
];

export const leads = [
  { id: 1, nome: 'Marcelo Antunes', contato: '(11) 99887-6543', email: 'marcelo@empresa.com', origem: 'Site', status: 'novo', interesse: 'Construção residencial de alto padrão', dataEntrada: '2026-04-18', valor: 5000000, observacoes: 'Tem terreno na zona sul de SP. Quer projeto personalizado.' },
  { id: 2, nome: 'Patricia Mendes', contato: '(41) 98765-4321', email: 'patricia@invest.com', origem: 'Indicação', status: 'em_contato', interesse: 'Galpão industrial 5.000m²', dataEntrada: '2026-04-15', valor: 12000000, observacoes: 'Indicada pelo cliente PortoLog. Reunião agendada para semana que vem.' },
  { id: 3, nome: 'Dr. Ricardo Farias', contato: '(31) 97654-3210', email: 'ricardo@clinica.com', origem: 'Instagram', status: 'proposta', interesse: 'Reforma de clínica médica', dataEntrada: '2026-04-10', valor: 1800000, observacoes: 'Proposta enviada em 16/04. Aguardando retorno.' },
  { id: 4, nome: 'Imobiliária Sol Nascente', contato: '(27) 96543-2109', email: 'contato@solnascente.com', origem: 'Site', status: 'negociacao', interesse: 'Condomínio de 80 unidades', dataEntrada: '2026-04-05', valor: 35000000, observacoes: 'Em negociação avançada. Visita ao terreno realizada.' },
  { id: 5, nome: 'Eduardo Vieira', contato: '(48) 95432-1098', email: 'eduardo@mail.com', origem: 'Evento', status: 'convertido', interesse: 'Casa de praia 300m²', dataEntrada: '2026-03-20', valor: 2200000, observacoes: 'Contrato assinado. Obra prevista para junho/2026.' },
  { id: 6, nome: 'Construtora Aliança', contato: '(11) 94321-0987', email: 'ali@alianca.com', origem: 'Indicação', status: 'perdido', interesse: 'Parceria para empreendimento', dataEntrada: '2026-03-01', valor: 0, observacoes: 'Não chegaram a acordo sobre o modelo de parceria.' },
  { id: 7, nome: 'Sandra Oliveira', contato: '(21) 93210-9876', email: 'sandra@mail.com', origem: 'Google', status: 'novo', interesse: 'Reforma de apartamento duplex', dataEntrada: '2026-04-20', valor: 450000, observacoes: 'Primeiro contato. Interessada em orçamento.' },
  { id: 8, nome: 'Grupo Educacional Saber', contato: '(19) 92109-8765', email: 'obras@saber.edu', origem: 'Site', status: 'em_contato', interesse: 'Construção de campus universitário', dataEntrada: '2026-04-12', valor: 42000000, observacoes: 'Projeto grande. Reunião técnica marcada para maio.' },
];

export const alertas = [
  { id: 1, tipo: 'critico', mensagem: 'Atraso na entrega de aço para Edif. Horizonte – prazo vence em 3 dias', obra: 'Edifício Comercial Horizonte', data: '2026-04-21' },
  { id: 2, tipo: 'atencao', mensagem: 'Inspeção de segurança pendente no Galpão PortoLog', obra: 'Galpão Logístico PortoLog', data: '2026-04-20' },
  { id: 3, tipo: 'info', mensagem: 'Residencial Parque das Águas – Vistoria final aprovada', obra: 'Residencial Parque das Águas', data: '2026-04-19' },
  { id: 4, tipo: 'atencao', mensagem: 'Orçamento do Shopping Vitória atingiu 15% do previsto – revisar cronograma', obra: 'Shopping Center Vitória', data: '2026-04-21' },
  { id: 5, tipo: 'critico', mensagem: 'Reforço estrutural necessário no pilar P23 – Residencial Villa Toscana', obra: 'Residencial Villa Toscana', data: '2026-04-21' },
];

export const clientes = [
  { id: 1, nome: 'Grupo Investimentos Alfa', cnpj: '12.345.678/0001-90', contato: '(11) 3333-4444', email: 'contato@grupooalfa.com', endereco: 'Av. Faria Lima, 2000 – São Paulo/SP' },
  { id: 2, nome: 'Horizonte Empreendimentos Ltda.', cnpj: '23.456.789/0001-01', contato: '(41) 3222-5555', email: 'contato@horizonte.com', endereco: 'Rua Marechal Deodoro, 500 – Curitiba/PR' },
  { id: 3, nome: 'PortoLog Logística S.A.', cnpj: '34.567.890/0001-12', contato: '(19) 3111-6666', email: 'obras@portolog.com', endereco: 'Rod. Anhanguera km 40 – Campinas/SP' },
  { id: 4, nome: 'Construtora Aliança', cnpj: '45.678.901/0001-23', contato: '(48) 3444-7777', email: 'contato@alianca.com', endereco: 'Rua Bocaiuva, 100 – Florianópolis/SC' },
  { id: 5, nome: 'Vitória Malls Administração', cnpj: '56.789.012/0001-34', contato: '(27) 3555-8888', email: 'projetos@vitoriamalls.com', endereco: 'Av. Reta da Penha, 1500 – Vitória/ES' },
  { id: 6, nome: 'Associação Beneficente Santa Clara', cnpj: '67.890.123/0001-45', contato: '(31) 3666-9999', email: 'obras@santaclara.org', endereco: 'Rua da Saúde, 100 – Belo Horizonte/MG' },
];

export const kpis = {
  totalObras: 6,
  obrasAndamento: 5,
  obrasConcluidas: 1,
  leadsCaptados: 8,
  registrosDiario: 87,
  orcamentoTotal: 148000000,
  gastoTotal: 44979000,
  tarefasPendentes: 12,
};

export const progressoMensal = [
  { mes: 'Nov/25', previsto: 15, realizado: 14 },
  { mes: 'Dez/25', previsto: 22, realizado: 20 },
  { mes: 'Jan/26', previsto: 30, realizado: 28 },
  { mes: 'Fev/26', previsto: 38, realizado: 36 },
  { mes: 'Mar/26', previsto: 45, realizado: 42 },
  { mes: 'Abr/26', previsto: 52, realizado: 48 },
];

export const obrasPorTipo = [
  { tipo: 'Residencial', quantidade: 2 },
  { tipo: 'Comercial', quantidade: 2 },
  { tipo: 'Industrial', quantidade: 1 },
  { tipo: 'Institucional', quantidade: 1 },
];

export const financeiroKpis = {
  receitaTotal: 58900000,
  despesasTotais: 44979000,
  lucroLiquido: 13921000,
  contasVencidas: 4,
};

export const contasPagar = [
  { id: 1, obraId: 1, descricao: 'Compra de aço CA-50', fornecedor: 'Metal Forte Ltda.', categoria: 'Material', valor: 420000, vencimento: '2026-04-20', status: 'atrasado' },
  { id: 2, obraId: 2, descricao: 'Locação de grua torre', fornecedor: 'EquipRent', categoria: 'Equipamentos', valor: 185000, vencimento: '2026-04-25', status: 'pendente' },
  { id: 3, obraId: 3, descricao: 'Folha equipe campo', fornecedor: 'Equipe Operacional', categoria: 'Mão de obra', valor: 96000, vencimento: '2026-04-21', status: 'pago' },
  { id: 4, obraId: 5, descricao: 'Concreto usinado etapa 1', fornecedor: 'ConcretMix', categoria: 'Material', valor: 680000, vencimento: '2026-04-19', status: 'atrasado' },
  { id: 5, obraId: 6, descricao: 'Projeto executivo complementar', fornecedor: 'Studio Engenharia', categoria: 'Serviços', valor: 54000, vencimento: '2026-04-30', status: 'pendente' },
];

export const contasReceber = [
  { id: 1, obraId: 1, cliente: 'Grupo Investimentos Alfa', origem: 'Medição', valor: 1250000, recebimento: '2026-04-23', status: 'pendente' },
  { id: 2, obraId: 2, cliente: 'Horizonte Empreendimentos Ltda.', origem: 'Parcela', valor: 2150000, recebimento: '2026-04-20', status: 'recebido' },
  { id: 3, obraId: 3, cliente: 'PortoLog Logística S.A.', origem: 'Contrato', valor: 860000, recebimento: '2026-04-18', status: 'recebido' },
  { id: 4, obraId: 5, cliente: 'Vitória Malls Administração', origem: 'Medição', valor: 3400000, recebimento: '2026-04-29', status: 'pendente' },
  { id: 5, obraId: 6, cliente: 'Associação Beneficente Santa Clara', origem: 'Parcela', valor: 440000, recebimento: '2026-04-16', status: 'atrasado' },
];

export const fluxoCaixa = [
  { periodo: 'Sem 1', entradas: 1800000, saidas: 1450000, saldo: 350000 },
  { periodo: 'Sem 2', entradas: 2100000, saidas: 1720000, saldo: 730000 },
  { periodo: 'Sem 3', entradas: 1700000, saidas: 1890000, saldo: 540000 },
  { periodo: 'Sem 4', entradas: 2300000, saidas: 1650000, saldo: 1190000 },
];

export const custosPorObra = obras.map((obra) => {
  const recebido =
    contasReceber.filter((item) => item.obraId === obra.id && item.status === 'recebido').reduce((acc, item) => acc + item.valor, 0) +
    Math.round(obra.orcamento * (obra.progresso / 100) * 0.65);
  const lucro = recebido - obra.gastoAtual;
  const percFinanceiro = Math.min(100, Math.round((recebido / obra.orcamento) * 100));
  return {
    obraId: obra.id,
    obra: obra.nome,
    custoPrevisto: obra.orcamento,
    custoRealizado: obra.gastoAtual,
    valorRecebido: recebido,
    lucro,
    percentualFinanceiro: percFinanceiro,
    percentualFisico: obra.progresso,
  };
});

export const centroCustos = [
  { categoria: 'Material', valor: 19800000 },
  { categoria: 'Mão de obra', valor: 14650000 },
  { categoria: 'Equipamentos', valor: 5450000 },
  { categoria: 'Serviços', valor: 3029000 },
  { categoria: 'Outros', valor: 2050000 },
];

export const relatoriosFinanceiros = [
  { id: 1, nome: 'Lucro por obra', tipo: 'PDF', atualizado: '2026-04-21' },
  { id: 2, nome: 'Despesas por período', tipo: 'Excel', atualizado: '2026-04-20' },
  { id: 3, nome: 'Receitas consolidadas', tipo: 'PDF', atualizado: '2026-04-21' },
];

export const caixaResumo = {
  saldoInicial: 250000,
  saldoAtual: 398500,
  saldoFinalPrevisto: 412000,
  inconsistencias: 1,
};

export const movimentosCaixa = [
  { id: 1, data: '2026-04-21 08:02', tipo: 'abertura', descricao: 'Abertura de caixa', valor: 250000, responsavel: 'Ana Paula Martins', obra: 'Matriz', status: 'ok' },
  { id: 2, data: '2026-04-21 09:40', tipo: 'entrada', descricao: 'Recebimento medição - Villa Toscana', valor: 180000, responsavel: 'Carlos Henrique Silva', obra: 'Residencial Villa Toscana', status: 'ok' },
  { id: 3, data: '2026-04-21 11:20', tipo: 'saida', descricao: 'Pagamento fornecedor concreto', valor: -125000, responsavel: 'Ana Paula Martins', obra: 'Edifício Comercial Horizonte', status: 'ok' },
  { id: 4, data: '2026-04-21 14:55', tipo: 'saida', descricao: 'Adiantamento equipe operacional', valor: -32000, responsavel: 'Roberto Souza', obra: 'Galpão Logístico PortoLog', status: 'alerta' },
  { id: 5, data: '2026-04-21 17:45', tipo: 'fechamento', descricao: 'Fechamento parcial de caixa', valor: 398500, responsavel: 'Ana Paula Martins', obra: 'Matriz', status: 'ok' },
];

export const materiais = [
  { id: 1, nome: 'Cimento CP-II', unidade: 'saco', categoria: 'Material estrutural', custoMedio: 42, quantidade: 380, obra: 'Central', status: 'normal' },
  { id: 2, nome: 'Aço CA-50 10mm', unidade: 'kg', categoria: 'Metal', custoMedio: 7.8, quantidade: 920, obra: 'Edifício Comercial Horizonte', status: 'baixo' },
  { id: 3, nome: 'Bloco cerâmico 14x19x29', unidade: 'unidade', categoria: 'Alvenaria', custoMedio: 2.2, quantidade: 6800, obra: 'Residencial Villa Toscana', status: 'normal' },
  { id: 4, nome: 'Tinta acrílica premium', unidade: 'lata', categoria: 'Acabamento', custoMedio: 380, quantidade: 14, obra: 'Reforma Hospital Santa Clara', status: 'critico' },
  { id: 5, nome: 'Eletroduto corrugado', unidade: 'metro', categoria: 'Elétrica', custoMedio: 3.4, quantidade: 1200, obra: 'Shopping Center Vitória', status: 'normal' },
];

export const movimentacoesEstoque = [
  { id: 1, data: '2026-04-21', material: 'Aço CA-50 10mm', tipo: 'Saída para obra', quantidade: 240, obra: 'Edifício Comercial Horizonte' },
  { id: 2, data: '2026-04-20', material: 'Cimento CP-II', tipo: 'Entrada', quantidade: 500, obra: 'Central' },
  { id: 3, data: '2026-04-19', material: 'Tinta acrílica premium', tipo: 'Transferência', quantidade: 20, obra: 'Reforma Hospital Santa Clara' },
];

export const tarefasAgenda = [
  { id: 1, titulo: 'Conferir medição da obra Villa Toscana', obraId: 1, responsavel: 'Carlos Henrique Silva', data: '2026-04-22', horario: '09:00', status: 'pendente' },
  { id: 2, titulo: 'Reunião com fornecedor de aço', obraId: 2, responsavel: 'Ana Paula Martins', data: '2026-04-22', horario: '14:00', status: 'em_andamento' },
  { id: 3, titulo: 'Checklist segurança canteiro', obraId: 3, responsavel: 'Roberto Souza', data: '2026-04-23', horario: '07:30', status: 'concluido' },
  { id: 4, titulo: 'Validação de projeto hidráulico', obraId: 6, responsavel: 'Fernanda Lima', data: '2026-04-23', horario: '11:30', status: 'pendente' },
];

export const agendaEventos = [
  { id: 1, titulo: 'Revisão semanal de obras', data: '2026-04-22', periodo: 'semanal' },
  { id: 2, titulo: 'Fechamento financeiro mensal', data: '2026-04-30', periodo: 'mensal' },
  { id: 3, titulo: 'Reunião diária de canteiro', data: '2026-04-21', periodo: 'diario' },
];

export const servicosCatalogo = [
  { id: 1, nome: 'Concretagem estrutural', descricao: 'Execução de concretagem em pilares, vigas e lajes.', tipo: 'Estrutural' },
  { id: 2, nome: 'Instalação de quadro elétrico', descricao: 'Montagem e ligação de quadros e circuitos.', tipo: 'Elétrica' },
  { id: 3, nome: 'Assentamento cerâmico', descricao: 'Aplicação de revestimento cerâmico em áreas internas.', tipo: 'Acabamento' },
];

export const etapasCatalogo = [
  { id: 1, nome: 'Fundação', ordem: 1, impacto: 18 },
  { id: 2, nome: 'Estrutura', ordem: 2, impacto: 22 },
  { id: 3, nome: 'Alvenaria', ordem: 3, impacto: 20 },
  { id: 4, nome: 'Instalações', ordem: 4, impacto: 20 },
  { id: 5, nome: 'Acabamento', ordem: 5, impacto: 20 },
];

export const cadastrosGerais = {
  tiposCusto: ['Material', 'Mão de obra', 'Equipamentos', 'Outros'],
  unidadesMedida: ['m²', 'm³', 'kg', 'unidade', 'hora', 'litro'],
  formasPagamento: ['Pix', 'Boleto', 'Transferência', 'Cartão', 'Dinheiro'],
  frequencias: ['Diário', 'Semanal', 'Mensal', 'Eventual'],
  cargos: ['Engenheiro', 'Mestre de obras', 'Pedreiro', 'Servente', 'Eletricista', 'Encanador'],
  especialidades: ['Elétrica', 'Hidráulica', 'Acabamento', 'Estrutural', 'Paisagismo'],
  grupos: ['Equipe Estrutural', 'Equipe Acabamento', 'Equipe Instalações', 'Administrativo'],
};

export const pessoas = [
  { id: 1, nome: 'Carlos Henrique Silva', documento: '123.456.789-00', contato: '(11) 98877-3322', endereco: 'São Paulo/SP', tipo: 'Usuário do sistema', cargo: 'Gerente de Obras', especialidade: 'Estrutural', grupo: 'Administrativo', obraId: 1 },
  { id: 2, nome: 'Roberto Souza', documento: '234.567.890-11', contato: '(19) 97766-2211', endereco: 'Campinas/SP', tipo: 'Funcionário', cargo: 'Mestre de obras', especialidade: 'Estrutural', grupo: 'Equipe Estrutural', obraId: 3 },
  { id: 3, nome: 'Fernanda Lima', documento: '345.678.901-22', contato: '(41) 96655-1100', endereco: 'Curitiba/PR', tipo: 'Usuário do sistema', cargo: 'Engenheira Civil', especialidade: 'Hidráulica', grupo: 'Equipe Instalações', obraId: 2 },
  { id: 4, nome: 'Grupo Investimentos Alfa', documento: '12.345.678/0001-90', contato: '(11) 3333-4444', endereco: 'São Paulo/SP', tipo: 'Cliente', cargo: 'N/A', especialidade: 'N/A', grupo: 'Clientes', obraId: 1 },
  { id: 5, nome: 'Rafael Nogueira', documento: '456.789.012-33', contato: '(31) 95544-0099', endereco: 'Belo Horizonte/MG', tipo: 'Profissional (prestador)', cargo: 'Técnico em segurança', especialidade: 'Segurança do trabalho', grupo: 'Terceiros', obraId: 6 },
];
