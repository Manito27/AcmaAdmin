import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (formData.email === 'abacarcosta@gmail.com' && formData.password === 'admin1234') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/app');
      } else {
        setError('Email ou senha incorretos');
        setLoading(false);
      }
    }, 1000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff', // fundo branco
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      padding: '20px'
    },
    box: {
      background: '#0D47A1', // azul principal
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      padding: '40px',
      color: '#fff' // texto branco dentro do card
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    h1: {
      fontSize: '28px',
      color: '#fff',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#e0e0e0',
      fontSize: '14px',
      margin: 0
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    errorMessage: {
      backgroundColor: '#fee',
      color: '#c33',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      border: '1px solid #fcc'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#fff'
    },
    input: {
      padding: '12px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#fff',
      color: '#000'
    },
    inputDisabled: {
      backgroundColor: '#f5f5f5',
      cursor: 'not-allowed'
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: '#fff'
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    checkbox: {
      cursor: 'pointer'
    },
    forgotPassword: {
      color: '#bbdefb',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    button: {
      padding: '14px',
      background: '#1976D2',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    },
    footer: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#e0e0e0'
    },
    footerLink: {
      color: '#bbdefb',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Bem-vindo</h1>
          <p style={styles.subtitle}>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorMessage}>{error}</div>}

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              disabled={loading}
              required
              style={{
                ...styles.input,
                ...(loading ? styles.inputDisabled : {})
              }}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              required
              style={{
                ...styles.input,
                ...(loading ? styles.inputDisabled : {})
              }}
            />
          </div>

          <div style={styles.formOptions}>
            <label style={styles.rememberMe}>
              <input type="checkbox" style={styles.checkbox} />
              <span>Lembrar-me</span>
            </label>
            <a href="#" style={styles.forgotPassword}>
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Não tem uma conta?{' '}
            <a href="#" style={styles.footerLink}>
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
