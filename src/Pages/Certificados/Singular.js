import React from 'react';
import { Form, Input, Button } from 'antd';

const CertificateQueryForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Aqui você pode adicionar lógica para consultar o certificado, como uma chamada API
  };

  return (
    <Form
      form={form}
      name="certificate_query_form"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
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
  );
};

export default CertificateQueryForm;