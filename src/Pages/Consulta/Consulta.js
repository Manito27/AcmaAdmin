import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Modal } from 'antd';

const { Option } = Select;

const CertificateQueryForm = () => {
  const [form] = Form.useForm();
  const [certificateAvailable, setCertificateAvailable] = useState(null); // null = não consultado, true/false = resultado
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = (values) => {
    console.log('Form values:', values);

    // Simulação de consulta API (substituir por fetch/axios)
    if (values.nuit === "123456789") {
      setCertificateAvailable(true);
      setModalVisible(true);
    } else {
      setCertificateAvailable(false);
      message.error("Certificado não disponível!");
    }
  };

  const handleDownload = () => {
    message.success("Iniciando download do certificado...");
    // Aqui você pode implementar o download real (ex: window.open(link_do_certificado))
  };

  const handleView = () => {
    message.info("Abrindo certificado...");
    // Aqui você pode implementar a visualização (ex: abrir PDF numa nova aba)
    window.open("/caminho/para/certificado.pdf", "_blank");
  };

  return (
    <>
      <Form
        form={form}
        name="certificate_query_form"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: '0 auto' }}
      >
        <Form.Item
          name="tipo"
          label="Tipo de Consulta"
          rules={[{ required: true, message: 'Selecione o tipo de consulta!' }]}
        >
          <Select placeholder="Selecione o tipo">
            <Option value="singular">Pessoa Singular</Option>
            <Option value="empresa">Empresa</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Por favor, insira o email!', type: 'email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="nuit"
          label="NUIT"
          rules={[{ required: true, message: 'Por favor, insira o NUIT!' }]}
        >
          <Input placeholder="NUIT" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Consultar Certificado
          </Button>
        </Form.Item>
      </Form>

      {/* Modal para visualizar ou baixar certificado */}
      <Modal
        title="Certificado disponível"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="view" onClick={handleView}>
            Visualizar
          </Button>,
          <Button key="download" type="primary" onClick={handleDownload}>
            Baixar
          </Button>,
        ]}
      >
        <p>O certificado foi encontrado. Escolha uma opção abaixo:</p>
      </Modal>
    </>
  );
};

export default CertificateQueryForm;
