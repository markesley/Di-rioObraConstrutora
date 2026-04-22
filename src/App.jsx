import { useMemo, useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ObrasListPage from './pages/ObrasListPage';
import ObraDetailPage from './pages/ObraDetailPage';
import DiarioObraPage from './pages/DiarioObraPage';
import AdminPage from './pages/AdminPage';
import FinanceiroPage from './pages/FinanceiroPage';
import CaixaPage from './pages/CaixaPage';
import EstoquePage from './pages/EstoquePage';
import TarefasAgendaPage from './pages/TarefasAgendaPage';
import PessoasPage from './pages/PessoasPage';
import AppLayout from './components/AppLayout';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedObraId, setSelectedObraId] = useState(null);
  const [userProfile, setUserProfile] = useState('gerente'); // 'gerente' | 'operador'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const profileAccess = useMemo(
    () => ({
      gerente: ['dashboard', 'obras', 'obra-detalhe', 'diario', 'diario-novo', 'financeiro', 'caixa', 'estoque', 'tarefas', 'pessoas', 'admin'],
      operador: ['dashboard', 'obras', 'obra-detalhe', 'diario', 'diario-novo', 'estoque'],
    }),
    [],
  );

  const profileHome = useMemo(
    () => ({
      gerente: 'admin',
      operador: 'diario',
    }),
    [],
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage(profileHome[userProfile]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateTo = (page, obraId) => {
    const allowed = profileAccess[userProfile] || [];
    setCurrentPage(allowed.includes(page) ? page : profileHome[userProfile]);
    if (obraId) setSelectedObraId(obraId);
  };

  const handleProfileChange = (profile) => {
    setUserProfile(profile);
    const allowed = profileAccess[profile] || [];
    if (!allowed.includes(currentPage)) {
      setCurrentPage(profileHome[profile]);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'obras':
        return <ObrasListPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'obra-detalhe':
        return <ObraDetailPage obraId={selectedObraId} navigateTo={navigateTo} userProfile={userProfile} />;
      case 'diario':
        return <DiarioObraPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'diario-novo':
        return <DiarioObraPage navigateTo={navigateTo} userProfile={userProfile} initialShowForm />;
      case 'financeiro':
        return <FinanceiroPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'caixa':
        return <CaixaPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'estoque':
        return <EstoquePage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'tarefas':
        return <TarefasAgendaPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'pessoas':
        return <PessoasPage navigateTo={navigateTo} userProfile={userProfile} />;
      case 'admin':
        return <AdminPage navigateTo={navigateTo} userProfile={userProfile} />;
      default:
        return <DashboardPage navigateTo={navigateTo} userProfile={userProfile} />;
    }
  };

  return (
    <AppLayout
      currentPage={currentPage}
      navigateTo={navigateTo}
      userProfile={userProfile}
      setUserProfile={handleProfileChange}
      onLogout={handleLogout}
    >
      {renderPage()}
    </AppLayout>
  );
}
