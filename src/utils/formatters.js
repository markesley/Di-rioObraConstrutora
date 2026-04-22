export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatDate = (value) =>
  new Intl.DateTimeFormat('pt-BR').format(new Date(value));

export const normalizeProgress = (progress) => {
  if (progress <= 25) return 25;
  if (progress <= 50) return 50;
  if (progress <= 75) return 75;
  return 100;
};

export const getProgressVisual = (progress) => {
  const normalized = normalizeProgress(progress);
  if (normalized === 25) return { tone: 'red', badge: 'badge-red', label: 'Crítica (25%)', value: 25 };
  if (normalized === 50) return { tone: 'amber', badge: 'badge-amber', label: 'Atenção (50%)', value: 50 };
  if (normalized === 75) return { tone: 'green', badge: 'badge-green', label: 'Controle (75%)', value: 75 };
  return { tone: 'blue', badge: 'badge-blue', label: 'Concluída (100%)', value: 100 };
};

export const getLeadStatus = (status) => {
  const map = {
    novo: { label: 'Novo', badge: 'badge-blue' },
    em_contato: { label: 'Em Contato', badge: 'badge-amber' },
    proposta: { label: 'Proposta', badge: 'badge-gray' },
    negociacao: { label: 'Negociação', badge: 'badge-amber' },
    convertido: { label: 'Convertido', badge: 'badge-green' },
    perdido: { label: 'Perdido', badge: 'badge-red' },
  };
  return map[status] || { label: status, badge: 'badge-gray' };
};

export const getAlertBadge = (tipo) => {
  const map = {
    critico: { label: 'Crítico', badge: 'badge-red' },
    atencao: { label: 'Atenção', badge: 'badge-amber' },
    info: { label: 'Informativo', badge: 'badge-blue' },
  };
  return map[tipo] || { label: tipo, badge: 'badge-gray' };
};
