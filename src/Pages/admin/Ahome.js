import React from "react";
import { Card } from "antd";

const Ahome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Card
        style={{
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ color: "#0D47A1", marginBottom: "16px" }}>
          Bem-vindo ao Painel do Administrador
        </h1>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Utilize o menu acima para navegar entre <b>Inscrições</b>,{" "}
          <b>Membros</b> e <b>Gestão de Pedidos</b>.
        </p>
      </Card>
    </div>
  );
};

export default Ahome;
