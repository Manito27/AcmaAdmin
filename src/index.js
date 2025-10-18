import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './Pages/Login';

// --- Importações das páginas ---
import Ahome from './Pages/admin/Ahome';
import Consultas from './Pages/admin/Consultas';
//import ConsultaBC from './Pages/admin/ConsultaBc';
import Inscri from './Pages/admin/Inscri';
//import Membros from './Pages/admin/Membros';

//import Certificados from './Pages/Certificados';
//import Empresas from './Pages/Empresas';

//import Consulta from './Pages/Consulta/Consulta';
//import ConsultaEmpresas from './Pages/Consulta/ConsultaEmpresas';
//import ConsultaPessoas from './Pages/Consulta/ConsultaPessoas';


// --- Definição das rotas ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Página inicial
  },
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app/ahome', element: <Ahome /> },
      { path: '/app/pedidos', element: <Consultas /> },
      { path: '/app/inscricoes', element: <Inscri /> },


    ],
  },
]);

// --- Renderização ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
