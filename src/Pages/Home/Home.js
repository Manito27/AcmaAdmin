import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';

import Whash from '../../assets/img/Whash.jpg';
import BigLifiting from '../../assets/img/BigLifiting.jpg';
import lifingtManager from '../../assets/img/lifingtManager.jpg';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout style={{ background: '#fff', overflowX: 'hidden', padding: '50px' }}>
      <Content>
        {/* Seção de Cards */}
        <Row gutter={[24, 24]} style={{ marginTop: '40px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Card 1 - Historial */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img src={Whash} alt="WASH" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              }
            >
              <Title level={4}>WASH(WATER SANITATION HYGIENE)</Title>
              <Paragraph style={{ color: '#555', textAlign: 'justify' }}>
                Em 2020 nasce a ACMA, LDA para salvaguardar a gestão empresarial e educacional em
                Moçambique e no mundo todo, garantindo um bom ambiente nas relações estabelecidas
                com os Recursos Humanos.
              </Paragraph>
            </Card>
          </Col>

          {/* Card 2 - Objectivo */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img src={BigLifiting} alt="Big Lifting" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              }
            >
              <Title level={4}>BIG LIFTING</Title>
              <Paragraph style={{ color: '#555', textAlign: 'justify' }}>
                O principal objetivo é o recrutamento, prestação de serviços e fornecimento
                de quadros profissionais, além de formação técnica e científica.
              </Paragraph>
            </Card>
          </Col>

          {/* Card 3 - Perspectivas */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img src={lifingtManager} alt="Lifting Manager" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              }
            >
              <Title level={4}>GENERALCERTIFICATE IN LIFTING MANAGER</Title>
              <Paragraph style={{ color: '#555', textAlign: 'justify' }}>
                Aprimorar a estrutura organizacional, fortalecer a eficiência entre setores e
                desenvolver soluções firmes em TICs para melhor gestão.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Texto adicional abaixo dos cards */}
        <div style={{ maxWidth: '1200px', margin: '40px auto', textAlign: 'center' }}>
          <Paragraph style={{ fontSize: '1.2rem', color: '#555', textAlign: 'justify' }}>
            A ACMA– LDA compromete-se com a excelência nos serviços prestados, oferecendo soluções
            personalizadas para cada cliente e mantendo os mais altos padrões de qualidade.
          </Paragraph>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;