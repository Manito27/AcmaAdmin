import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";

const ListaInscritos = () => {
  const [inscritos, setInscritos] = useState([]);

  // Simulação de busca de dados (podes trocar pela tua API)
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, nome: "João Silva", email: "joao@email.com", contacto: "841234567" },
        { id: 2, nome: "Maria Santos", email: "maria@email.com", contacto: "842345678" },
        { id: 3, nome: "Pedro Costa", email: "pedro@email.com", contacto: "843456789" },
      ];
      setInscritos(data);
    };
    fetchData();
  }, []);

  // Definição das colunas da tabela
  const columns = [
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
      title: "Contacto",
      dataIndex: "contacto",
      key: "contacto",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
        <h2 className="text-xl font-semibold mb-4">Lista de Inscritos</h2>
        <Table
          columns={columns}
          dataSource={inscritos}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
    </div>
  );
};

export default ListaInscritos;
