import { Building2, Lock, Mail } from 'lucide-react';
import logoOcca from '../assets/logoocca.png';

export default function LoginPage({ onLogin }) {
  return (
    <div className="login-page">
      <section className="login-left">
        <div className="login-form-wrapper">
          <div className="login-logo">
            <div className="login-logo-icon logo-image-wrap">
              <img src={logoOcca} alt="Logo Construtora OCCA" className="system-logo-img" />
            </div>
            <span>Construtora OCCA</span>
          </div>
          <h1>Sistema de Gestão de Obras e Administrativo</h1>
          <p className="subtitle">Acesse a plataforma corporativa para controle total de obras e operação administrativa.</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            <div className="form-group">
              <label>E-mail corporativo</label>
              <div className="field-with-icon">
                <Mail size={16} />
                <input type="email" placeholder="seu.nome@occa.com.br" required />
              </div>
            </div>
            <div className="form-group">
              <label>Senha</label>
              <div className="field-with-icon">
                <Lock size={16} />
                <input type="password" placeholder="Digite sua senha" required />
              </div>
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Manter conectado
              </label>
              <a href="#">Esqueci minha senha</a>
            </div>
            <button className="btn btn-primary btn-full btn-lg" type="submit">
              <Building2 size={18} />
              Entrar no sistema
            </button>
          </form>
        </div>
      </section>

      <section className="login-right">
        <div className="login-right-content">
          <img src={logoOcca} alt="Logo Construtora OCCA" className="login-right-logo" />
          <h2>Gestão em tempo real para obras e escritório</h2>
          <p>
            Monitore progresso físico, diário de obra, evidências fotográficas, leads e indicadores executivos em
            uma única plataforma robusta e responsiva.
          </p>
        </div>
        <div className="login-decoration"></div>
        <div className="login-decoration-2"></div>
      </section>
    </div>
  );
}
