import { Navigate, Route, Routes } from "react-router";

import LoginSucursal from "./sucursal/LoginSucursal";
import SucursalUsers from "./sucursal/SucursalUsers";
import LoginSucursalUser from "./sucursal/LoginSucursalUser";
import MainAplication from "./main/MainAplication";
import Almacen from "./almacen/Almancen";
import Compras from "./compras/Compras";
import Ventas from "./ventas/Ventas";
import Usuarios from "./usuarios/Usuarios";
import Auditoria from "./auditoria/Auditoria";
import Productos from "./productos/Productos";
import ListaProductos from "./productos/sm-lista/ListaProductos";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogsProductos from "./productos/sm-historial/LogsProductos";


export default function RoutesMain() {
  const { id, userData } = useSelector((s:RootState) => s.Sucursal)

    
  return (
      <Routes>
        <Route index element={<LoginSucursal/> }/>
        <Route path="login-user" element={id? <SucursalUsers/> : <Navigate to='/'/>}>
          <Route path=":id" element={ <LoginSucursalUser/> } />
        </Route>
        <Route path="main" element={ userData? <MainAplication/> : <Navigate to='/login-user'/> }>
          <Route path="productos" element={<Productos/>}>
            <Route index element={<Navigate to='lista' />}/>
            <Route path="lista" element={<ListaProductos/>}/>
            <Route path="logs" element={<LogsProductos/>} />
          </Route>
          <Route path="almacen" element={<Almacen/>} />
          <Route path="compras" element={<Compras/>} />
          <Route path="ventas" element={<Ventas/>} />
          <Route path="usuarios" element={<Usuarios/>} />
          <Route path="auditoria" element={<Auditoria/>} />
        </Route>
      </Routes>

  );
}