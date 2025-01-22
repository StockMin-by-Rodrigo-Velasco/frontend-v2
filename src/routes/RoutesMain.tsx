import { Route, Routes } from "react-router";

import LoginSucursal from "./sucursal/LoginSucursal";
import SucursalUsers from "./sucursal/SucursalUsers";
import LoginSucursalUser from "./sucursal/LoginSucursalUser";
import MainAplication from "./main/MainAplication";
import Items from "./items/Items";
import Almacen from "./almacen/Almancen";
import Compras from "./compras/Compras";
import Ventas from "./ventas/Ventas";
import Usuarios from "./usuarios/Usuarios";
import Auditoria from "./auditoria/Auditoria";


export default function RoutesMain() {
    
  return (
      <Routes>
        <Route index element={<LoginSucursal/> }/>
        <Route path="login-user" element={ <SucursalUsers/> }>
          <Route path=":id" element={ <LoginSucursalUser/> } />
        </Route>
        <Route path="main" element={ <MainAplication/> }>
          <Route path="items" element={<Items/>} />
          <Route path="almacen" element={<Almacen/>} />
          <Route path="compras" element={<Compras/>} />
          <Route path="ventas" element={<Ventas/>} />
          <Route path="usuarios" element={<Usuarios/>} />
          <Route path="auditoria" element={<Auditoria/>} />
        </Route>
      </Routes>

  );
}