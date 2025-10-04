import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Menu,
  Form,
  Input,
  Button,
  Modal,
  message,
  Popconfirm,
} from "antd";

const { TextArea } = Input;

const ListaClientes = () => {
  const [view, setView] = useState("list");
  const [clientes, setClientes] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const baseUrl = "http://localhost:8000/api/clientes/";

  // 🔹 Buscar clientes
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      message.error("Erro ao buscar clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // 🔹 Adicionar cliente
  const handleAddCliente = async (values) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Cliente adicionado com sucesso!");
        form.resetFields();
        setView("list");
        fetchClientes();
      } else {
        message.error("Erro ao adicionar cliente.");
      }
    } catch (error) {
      message.error("Falha na conexão com o servidor.");
    }
  };

  // 🔹 Editar cliente
  const handleEdit = (record) => {
    setEditingCliente(record);
    editForm.setFieldsValue(record);
  };

  const handleUpdateCliente = async (values) => {
    try {
      const response = await fetch(`${baseUrl}${editingCliente.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Cliente atualizado com sucesso!");
        setEditingCliente(null);
        fetchClientes();
      } else {
        message.error("Erro ao atualizar cliente.");
      }
    } catch (error) {
      message.error("Falha ao conectar com o servidor.");
    }
  };

  // 🔹 Excluir cliente
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Cliente excluído com sucesso!");
        fetchClientes();
      } else {
        message.error("Erro ao excluir cliente.");
      }
    } catch (error) {
      message.error("Falha ao conectar com o servidor.");
    }
  };

  // 🔹 Colunas da tabela
  const columns = [
    {
      title: "Nome Completo",
      render: (record) => `${record.nome} ${record.apelido}`,
      key: "nome",
    },
    {
      title: "NUIT",
      dataIndex: "nuit",
      key: "nuit",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <Popconfirm
            title="Tens certeza que queres excluir este cliente?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger type="link">
              Excluir
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Gestão de Clientes</h2>

        {/* Submenu */}
        <Menu
          mode="horizontal"
          selectedKeys={[view]}
          onClick={(e) => setView(e.key)}
          className="mb-4"
          items={[
            { key: "list", label: "📋 Listar Clientes" },
            { key: "add", label: "➕ Adicionar Cliente" },
          ]}
        />

        {/* Lista */}
        {view === "list" && (
          <Table
            columns={columns}
            dataSource={clientes}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        )}

        {/* Formulário de adicionar */}
        {view === "add" && (
          <Card className="mt-4 shadow-sm border rounded-lg">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddCliente}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: "Por favor insira o nome!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="apelido"
                label="Apelido"
                rules={[{ required: true, message: "Por favor insira o apelido!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="nuit"
                label="NUIT"
                rules={[{ required: true, message: "Por favor insira o NUIT!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: "email", message: "Email inválido!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="telefone" label="Telefone">
                <Input />
              </Form.Item>
              <Form.Item name="endereco" label="Endereço">
                <TextArea rows={2} />
              </Form.Item>

              <div className="col-span-2 flex justify-end">
                <Button type="primary" htmlType="submit">
                  Registar Cliente
                </Button>
              </div>
            </Form>
          </Card>
        )}

        {/* Modal de edição */}
        <Modal
          open={!!editingCliente}
          title="Editar Cliente"
          okText="Salvar"
          cancelText="Cancelar"
          onCancel={() => setEditingCliente(null)}
          onOk={() => editForm.submit()}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleUpdateCliente}
          >
            <Form.Item name="nome" label="Nome">
              <Input />
            </Form.Item>
            <Form.Item name="apelido" label="Apelido">
              <Input />
            </Form.Item>
            <Form.Item name="nuit" label="NUIT">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="telefone" label="Telefone">
              <Input />
            </Form.Item>
            <Form.Item name="endereco" label="Endereço">
              <TextArea rows={2} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default ListaClientes;
