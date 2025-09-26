import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const Membros = () => {
  const [membros] = useState([
    {
      key: "1",
      nome: "João Manuel",
      email: "joao@email.com",
    },
    {
      key: "2",
      nome: "Maria Silva",
      email: "maria@email.com",
    },
    {
      key: "3",
      nome: "Carlos Alberto",
      email: "carlos@email.com",
    },
  ]);

  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const colunas = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Button type="link" onClick={() => setMembroSelecionado(record)}>
          Ver Detalhes
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#0D47A1" }}>
        Lista de Membros
      </h2>
      <Table
        columns={colunas}
        dataSource={membros}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Modal para detalhes */}
      <Modal
        open={!!membroSelecionado}
        title="Detalhes do Membro"
        onCancel={() => setMembroSelecionado(null)}
        footer={null}
      >
        {membroSelecionado && (
          <div>
            <p>
              <strong>Nome:</strong> {membroSelecionado.nome}
            </p>
            <p>
              <strong>Email:</strong> {membroSelecionado.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Membros;
