import React, { useEffect, useState } from "react";
import {
  Card,
  Menu,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
  Select,
  Popconfirm,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

const GestaoCertificados = () => {
  const [view, setView] = useState("gestao"); // controla o submenu ativo
  const [certificados, setCertificados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [formCertificado] = Form.useForm();
  const [formAssociacao] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const baseUrl = "http://localhost:8000/api";

  // 🔹 Buscar certificados
  const fetchCertificados = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/certificados/`);
      const data = await res.json();
      setCertificados(data);
    } catch (err) {
      message.error("Erro ao carregar certificados!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Buscar clientes
  const fetchClientes = async () => {
    try {
      const res = await fetch(`${baseUrl}/clientes/`);
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      message.error("Erro ao carregar clientes!");
    }
  };

  // 🔹 Buscar associações cliente-certificado
  const fetchAssociacoes = async () => {
    try {
      const res = await fetch(`${baseUrl}/cliente-certificados/`);
      const data = await res.json();
      setAssociacoes(data);
    } catch (err) {
      message.error("Erro ao carregar associações!");
    }
  };

  useEffect(() => {
    fetchCertificados();
    fetchClientes();
    fetchAssociacoes();
  }, []);

  // 🔹 Adicionar certificado
  const handleAddCertificado = async (values) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("descricao", values.descricao || "");
    formData.append("data_emissao", values.data_emissao.format("YYYY-MM-DD"));
    if (values.validade) formData.append("validade", values.validade.format("YYYY-MM-DD"));
    if (values.arquivos && values.arquivos[0]) {
      formData.append("arquivos", values.arquivos[0].originFileObj);
    }

    try {
      const res = await fetch(`${baseUrl}/certificados/`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        message.success("Certificado adicionado com sucesso!");
        formCertificado.resetFields();
        fetchCertificados();
      } else {
        message.error("Erro ao adicionar certificado!");
      }
    } catch {
      message.error("Falha ao conectar com o servidor!");
    }
  };

  // 🔹 Editar certificado
  const handleEdit = (record) => {
    setEditing(record);
    editForm.setFieldsValue({
      ...record,
      data_emissao: record.data_emissao ? dayjs(record.data_emissao) : null,
      validade: record.validade ? dayjs(record.validade) : null,
    });
  };

  const handleUpdateCertificado = async (values) => {
    const formData = new FormData();
    formData.append("titulo", values.titulo);
    formData.append("descricao", values.descricao || "");
    formData.append("data_emissao", values.data_emissao.format("YYYY-MM-DD"));
    if (values.validade) formData.append("validade", values.validade.format("YYYY-MM-DD"));
    if (values.arquivos && values.arquivos[0]) {
      formData.append("arquivos", values.arquivos[0].originFileObj);
    }

    try {
      const res = await fetch(`${baseUrl}/certificados/${editing.id}/`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        message.success("Certificado atualizado com sucesso!");
        setEditing(null);
        fetchCertificados();
      } else {
        message.error("Erro ao atualizar certificado!");
      }
    } catch {
      message.error("Falha ao conectar com o servidor!");
    }
  };

  // 🔹 Excluir certificado
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/certificados/${id}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        message.success("Certificado excluído com sucesso!");
        fetchCertificados();
      } else {
        message.error("Erro ao excluir certificado!");
      }
    } catch {
      message.error("Falha ao conectar com o servidor!");
    }
  };

  // 🔹 Associar certificado ao cliente
  const handleAssociar = async (values) => {
    try {
      const res = await fetch(`${baseUrl}/cliente-certificados/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: values.cliente,
          certificado: values.certificado,
        }),
      });
      if (res.ok) {
        message.success("Certificado associado ao cliente com sucesso!");
        formAssociacao.resetFields();
        fetchAssociacoes();
      } else {
        message.error("Erro ao associar certificado!");
      }
    } catch {
      message.error("Falha ao conectar com o servidor!");
    }
  };

  // 🔹 Colunas da tabela de certificados
  const colunasCertificados = [
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Descrição", dataIndex: "descricao", key: "descricao" },
    { title: "Data de Emissão", dataIndex: "data_emissao", key: "data_emissao" },
    { title: "Validade", dataIndex: "validade", key: "validade" },
    {
      title: "Arquivo",
      dataIndex: "arquivos",
      key: "arquivos",
      render: (file) =>
        file ? (
          <a href={`http://localhost:8000${file}`} target="_blank" rel="noreferrer">
            Ver Documento
          </a>
        ) : (
          "-"
        ),
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
            title="Tens certeza que queres excluir este certificado?"
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

  // 🔹 Colunas da tabela de associações
  const colunasAssociacoes = [
    { title: "Cliente", dataIndex: "cliente_nome", key: "cliente_nome" },
    { title: "Certificado", dataIndex: "certificado_titulo", key: "certificado_titulo" },
    { title: "Data de Atribuição", dataIndex: "data_atribuicao", key: "data_atribuicao" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">
          Gestão de Certificados
        </h2>

        {/* 🔸 Submenu */}
        <Menu
          mode="horizontal"
          selectedKeys={[view]}
          onClick={(e) => setView(e.key)}
          className="mb-4"
          items={[
            { key: "gestao", label: "🧾 Gerir Certificados" },
            { key: "listar", label: "📋 Listar Certificados" },
            { key: "associar", label: "👥 Associar a um Cliente" },
          ]}
        />

        {/* 🔹 Gerir Certificados */}
        {view === "gestao" && (
          <>
          <h3 className="text-lg font-semibold mb-3">📄 Adicionar Certificados</h3>
            <Form
              form={formCertificado}
              layout="vertical"
              onFinish={handleAddCertificado}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <Form.Item
                name="titulo"
                label="Título"
                rules={[{ required: true, message: "Insira o título!" }]}
              >
                <Input placeholder="Título do certificado" />
              </Form.Item>

              <Form.Item name="descricao" label="Descrição">
                <TextArea placeholder="Descrição do certificado" rows={2} />
              </Form.Item>

              <Form.Item
                name="data_emissao"
                label="Data de Emissão"
                rules={[{ required: true, message: "Selecione a data!" }]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item name="validade" label="Validade">
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item name="arquivos" label="Arquivo">
                <Upload beforeUpload={() => false} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Selecionar Arquivo</Button>
                </Upload>
              </Form.Item>

              <div className="col-span-2 flex justify-end">
                <Button type="primary" htmlType="submit">
                  Adicionar Certificado
                </Button>
              </div>
            </Form>
          </>
        )}

        {/* 🔹 Listar Certificados e Associações */}
        {view === "listar" && (
          <>
            <h3 className="text-lg font-semibold mb-3">📄 Certificados</h3>
            <Table
              columns={colunasCertificados}
              dataSource={certificados}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 5 }}
              className="mb-8"
            />

            <h3 className="text-lg font-semibold mb-3">🤝 Associações Cliente-Certificado</h3>
            <Table
              columns={colunasAssociacoes}
              dataSource={associacoes}
              rowKey={(r) => `${r.cliente}_${r.certificado}`}
              pagination={{ pageSize: 5 }}
            />
          </>
        )}

        {/* 🔹 Associar Certificado a Cliente */}
        {view === "associar" && (
          <Card className="mt-4 shadow-sm border rounded-lg">
            <Form
              form={formAssociacao}
              layout="vertical"
              onFinish={handleAssociar}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Form.Item
                name="cliente"
                label="Cliente"
                rules={[{ required: true, message: "Selecione um cliente!" }]}
              >
                <Select placeholder="Selecione o cliente">
                  {clientes.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.nome} {c.apelido}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="certificado"
                label="Certificado"
                rules={[{ required: true, message: "Selecione um certificado!" }]}
              >
                <Select placeholder="Selecione o certificado">
                  {certificados.map((cert) => (
                    <Select.Option key={cert.id} value={cert.id}>
                      {cert.titulo}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="col-span-2 flex justify-end">
                <Button type="primary" htmlType="submit">
                  Associar
                </Button>
              </div>
            </Form>
          </Card>
        )}

        {/* 🔹 Modal de Edição */}
        <Modal
          open={!!editing}
          title="Editar Certificado"
          onCancel={() => setEditing(null)}
          onOk={() => editForm.submit()}
          okText="Salvar"
          cancelText="Cancelar"
        >
          <Form form={editForm} layout="vertical" onFinish={handleUpdateCertificado}>
            <Form.Item name="titulo" label="Título">
              <Input />
            </Form.Item>
            <Form.Item name="descricao" label="Descrição">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item name="data_emissao" label="Data de Emissão">
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item name="validade" label="Validade">
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item name="arquivos" label="Arquivo">
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Selecionar Novo Arquivo</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default GestaoCertificados;
