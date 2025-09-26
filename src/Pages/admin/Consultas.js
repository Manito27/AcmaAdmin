import React, { useState } from "react";
import { Tabs, Table, Upload, Button, message, Modal } from "antd";
import { UploadOutlined, FileTextOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Consultas = () => {
  // Mock de dados pendentes
  const [pendentes] = useState([
    {
      key: "1",
      nome: "João Manuel",
      pedido: "Certificado de Curso",
      data: "2025-09-10",
    },
    {
      key: "2",
      nome: "Maria Silva",
      pedido: "Declaração de Notas",
      data: "2025-09-11",
    },
  ]);

  // Mock de dados concluídos
  const [concluidos] = useState([
    {
      key: "3",
      nome: "Carlos Alberto",
      pedido: "Histórico Acadêmico",
      data: "2025-09-05",
      arquivo: "historico_carlos.pdf",
    },
    {
      key: "4",
      nome: "Ana Paula",
      pedido: "Certificado de Conclusão",
      data: "2025-09-02",
      arquivo: "certificado_ana.pdf",
    },
  ]);

  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Upload handler (simulação)
  const handleUpload = (file, record) => {
    message.success(`Arquivo "${file.name}" enviado para ${record.nome}`);
    return false; // Evita upload automático
  };

  // Colunas para pedidos pendentes
  const colunasPendentes = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Pedido",
      dataIndex: "pedido",
      key: "pedido",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Upload beforeUpload={(file) => handleUpload(file, record)} showUploadList={false}>
          <Button type="primary" size="small" icon={<UploadOutlined />}>
            Submeter Arquivo
          </Button>
        </Upload>
      ),
    },
  ];

  // Colunas para pedidos concluídos
  const colunasConcluidos = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Pedido",
      dataIndex: "pedido",
      key: "pedido",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Arquivo",
      dataIndex: "arquivo",
      key: "arquivo",
      render: (arquivo) => <span>{arquivo}</span>,
    },
    {
      title: "Detalhes",
      key: "detalhes",
      render: (_, record) => (
        <Button type="link" onClick={() => setPedidoSelecionado(record)}>
          Ver Detalhes
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#0D47A1" }}>Gestão de Pedidos</h2>

      <Tabs defaultActiveKey="pendentes">
        <TabPane tab="Pendentes" key="pendentes">
          <Table columns={colunasPendentes} dataSource={pendentes} bordered pagination={false} />
        </TabPane>

        <TabPane tab="Concluídos" key="concluidos">
          <Table columns={colunasConcluidos} dataSource={concluidos} bordered pagination={false} />
        </TabPane>
      </Tabs>

      {/* Modal para detalhes de pedidos concluídos */}
      <Modal
        open={!!pedidoSelecionado}
        title="Detalhes do Pedido"
        onCancel={() => setPedidoSelecionado(null)}
        footer={null}
      >
        {pedidoSelecionado && (
          <div>
            <p>
              <strong>Nome:</strong> {pedidoSelecionado.nome}
            </p>
            <p>
              <strong>Pedido:</strong> {pedidoSelecionado.pedido}
            </p>
            <p>
              <strong>Data:</strong> {pedidoSelecionado.data}
            </p>
            <p>
              <strong>Arquivo:</strong> {pedidoSelecionado.arquivo}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Consultas;
