import { useState } from 'react';
import {
  LayoutDashboard, Building2, HardHat, ClipboardList, Settings, Bell,
  Search, Menu, X, LogOut, Shield, Wallet, Landmark, Boxes, CalendarDays, UsersRound
} from 'lucide-react';
import logoOcca from '../assets/logoocca.png';

export default function AppLayout({ children, currentPage, navigateTo, userProfile, setUserProfile, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuOperacaoGerente = [
    { id: 'dashboard', label: 'Painel Admin', icon: LayoutDashboard },
    { id: 'obras', label: 'Registro de Obras', icon: Building2, badge: 5 },
    { id: 'tarefas', label: 'Controle de Atividades', icon: CalendarDays },
  ];

  const menuOperacaoOperador = [
    { id: 'dashboard', label: 'Painel Operador', icon: LayoutDashboard },
    { id: 'obras', label: 'Registro de Obras', icon: Building2, badge: 5 },
    { id: 'diario', label: 'Diário de Obra', icon: ClipboardList, badge: 3 },
  ];

  const menuFinanceiro = [
    { id: 'financeiro', label: 'Financeiro', icon: Wallet, badge: 4 },
    { id: 'caixa', label: 'Caixa (Tesouraria)', icon: Landmark },
  ];

  const menuGestao = [
    { id: 'estoque', label: 'Materiais e Estoque', icon: Boxes, badge: 2 },
    { id: 'pessoas', label: 'Gestão de Pessoas', icon: UsersRound },
  ];

  const menuAdmin = [
    { id: 'admin', label: 'Administração Geral', icon: Settings },
  ];

  const menuOperacao = userProfile === 'gerente' ? menuOperacaoGerente : menuOperacaoOperador;

  const handleNav = (id) => {
    navigateTo(id);
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon logo-image-wrap">
            <img src={logoOcca} alt="Logo Construtora OCCA" className="system-logo-img" />
          </div>
          <div className="sidebar-logo-text">
            <h3>OCCA Construtora</h3>
            <span>Sistema de Gestão</span>
          </div>
        </div>

        <nav className="sidebar-section">
          <div className="sidebar-section-title">Operação de Obras</div>
          {menuOperacao.map(item => (
            <a
              key={item.id}
              className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="icon"><item.icon size={20} /></span>
              {item.label}
              {item.badge && <span className="badge-count">{item.badge}</span>}
            </a>
          ))}
        </nav>

        {userProfile === 'gerente' && (
          <>
            <nav className="sidebar-section">
              <div className="sidebar-section-title">Financeiro</div>
              {menuFinanceiro.map(item => (
                <a
                  key={item.id}
                  className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <span className="icon"><item.icon size={20} /></span>
                  {item.label}
                  {item.badge && <span className="badge-count">{item.badge}</span>}
                </a>
              ))}
            </nav>

            <nav className="sidebar-section">
              <div className="sidebar-section-title">Suprimentos e Pessoas</div>
              {menuGestao.map(item => (
                <a
                  key={item.id}
                  className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <span className="icon"><item.icon size={20} /></span>
                  {item.label}
                  {item.badge && <span className="badge-count">{item.badge}</span>}
                </a>
              ))}
            </nav>

            <nav className="sidebar-section">
              <div className="sidebar-section-title">Administração</div>
              {menuAdmin.map(item => (
                <a
                  key={item.id}
                  className={`sidebar-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <span className="icon"><item.icon size={20} /></span>
                  {item.label}
                </a>
              ))}
            </nav>
          </>
        )}

        {userProfile === 'operador' && (
          <nav className="sidebar-section">
            <div className="sidebar-section-title">Suprimentos</div>
            <a
              className={`sidebar-link ${currentPage === 'estoque' ? 'active' : ''}`}
              onClick={() => handleNav('estoque')}
            >
              <span className="icon"><Boxes size={20} /></span>
              Estoque da Obra
            </a>
          </nav>
        )}

        <nav className="sidebar-section">
          <div className="sidebar-section-title">Perfil de Acesso</div>
          <a
            className={`sidebar-link ${userProfile === 'gerente' ? 'active' : ''}`}
            onClick={() => setUserProfile('gerente')}
          >
            <span className="icon"><Shield size={20} /></span>
            Gerente (Admin)
          </a>
          <a
            className={`sidebar-link ${userProfile === 'operador' ? 'active' : ''}`}
            onClick={() => setUserProfile('operador')}
          >
            <span className="icon"><HardHat size={20} /></span>
            Operador
          </a>
        </nav>

        <div className="sidebar-user" onClick={onLogout}>
          <div className="sidebar-user-avatar">
            {userProfile === 'gerente' ? 'CS' : 'RS'}
          </div>
          <div className="sidebar-user-info">
            <div className="name">{userProfile === 'gerente' ? 'Carlos Henrique Silva' : 'Roberto Souza'}</div>
            <div className="role">{userProfile === 'gerente' ? 'Gerente de Obras' : 'Mestre de Obras'}</div>
          </div>
          <LogOut size={16} style={{ color: 'rgba(255,255,255,.4)' }} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2>
              {{
                dashboard: 'Dashboard',
                obras: 'Registro de Obras',
                'obra-detalhe': 'Detalhe da Obra',
                diario: 'Diário de Obra',
                'diario-novo': 'Diário de Obra',
                financeiro: 'Financeiro',
                caixa: 'Caixa (Tesouraria)',
                estoque: 'Materiais e Estoque',
                tarefas: 'Controle de Atividades',
                pessoas: 'Gestão de Pessoas',
                admin: 'Administração',
              }[currentPage] || 'Dashboard'}
            </h2>
          </div>
          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} color="#94A3B8" />
              <input type="text" placeholder="Buscar obras, tarefas, materiais..." />
            </div>
            <button className="topbar-notification">
              <Bell size={18} />
              <span className="dot"></span>
            </button>
            <div className="profile-switcher">
              <button
                className={userProfile === 'gerente' ? 'active' : ''}
                onClick={() => setUserProfile('gerente')}
              >
                Gerente
              </button>
              <button
                className={userProfile === 'operador' ? 'active' : ''}
                onClick={() => setUserProfile('operador')}
              >
                Operador
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
