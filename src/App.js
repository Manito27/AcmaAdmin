
import React from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, FileDoneOutlined, SolutionOutlined, HomeOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importar páginas do administrador
import Inscri from './Pages/admin/Inscri';
import Membros from './Pages/admin/Membros';
import Consultas from './Pages/admin/Consultas';


const { Header, Content, Footer } = Layout;

const App = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(`/${e.key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Navbar Admin */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0D47A1',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          padding: '0 24px',
          height: '64px',
          lineHeight: '64px'
        }}
      >
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '22px', 
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          letterSpacing: '1px'
        }}>
          Painel do Administrador
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'flex-end',
            display: 'flex',
            backgroundColor: 'transparent',
            border: 'none',
            lineHeight: '64px'
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="home" icon={<HomeOutlined />} style={{ fontWeight: '500' }}>
            Home
          </Menu.Item>
          <Menu.Item key="inscricoes" icon={<FileDoneOutlined />} style={{ fontWeight: '500' }}>
            Inscrições
          </Menu.Item>
          <Menu.Item key="pedidos" icon={<SolutionOutlined />} style={{ fontWeight: '500' }}>
            Gestão de Certificados
          </Menu.Item>
        </Menu>
      </Header>

      {/* Conteúdo */}
      <Content
        style={{
          padding: '0 48px',
          marginTop: '2%',
          flex: 1,
          marginBottom: '64px'
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <Routes>
            <Route path="/inscricoes" element={<Inscri />} />
            <Route path="/membros" element={<Membros />} />
            <Route path="/pedidos" element={<Consultas />} />
            
          </Routes>
        </div>
      </Content>

      {/* Rodapé */}
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#0D47A1',
          color: '#fff',
          padding: '16px 20px',
          fontWeight: '500',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
          Painel do Administrador ©{new Date().getFullYear()} | Todos os direitos reservados
        </div>
      </Footer>
    </Layout>
  );
};

export default App;
