import { Navigate, Route, Routes } from "react-router";

import LoginSucursal from "./sucursal/LoginSucursal";
import SucursalUsers from "./sucursal/SucursalUsers";
import LoginSucursalUser from "./sucursal/LoginSucursalUser";
import MainAplication from "./main/MainAplication";
import Ventas from "./ventas/Ventas";
import ListaUsuarios from "./usuarios/lista-sm/ListaUsuarios";

import Productos from "./productos/Productos";
import ListaProductos from "./productos/sm-lista/ListaProductos";
import OpcionesProductos from "./productos/sm-opciones/OpcionesProductos";
import HistorialProductos from "./productos/sm-historial/HistorialProductos";

import Almacenes from "./almacenes/Almancenes";
import ListaAlmacenes from "./almacenes/sm-lista/ListaAlmacenes";
import HistorialAlmacenes from "./almacenes/sm-historial/HistorialAlmacenes";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SelectedAlmacen from "./almacenes/sm-lista/SelectedAlmacen";
import ClientesVentas from "./ventas/sm-clientes/ClientesVentas";
import HistorialVentas from "./ventas/sm-historial/HistorialVentas";
import OpcionesVentas from "./ventas/sm-opciones/OpcionesVentas";
import TiendaVentas from "./ventas/sm-tienda/TeindaVentas";
import Usuarios from "./usuarios/Usuarios";


export default function RoutesMain() {
  const { id, userData } = useSelector((s:RootState) => s.Sucursal);
  const { selectedAlmacen } = useSelector((s:RootState) => s.Almacenes);

  return (
      <Routes>
        <Route index element={<LoginSucursal/> }/>
        <Route path="login-user" element={id? <SucursalUsers/> : <Navigate to='/'/>}>
          <Route path=":id" element={ <LoginSucursalUser/> } />
        </Route>
        <Route path="main" element={ userData? <MainAplication/> : <Navigate to='/login-user'/> }>
        
          <Route path="productos" element={<Productos/>}>
            <Route index element={<Navigate to='lista'/>}/>
            <Route path="lista" element={<ListaProductos/>}/>
            <Route path="opciones" element={<OpcionesProductos/>}/>
            <Route path="historial" element={<HistorialProductos/>} />
          </Route>

          <Route path="almacenes" element={<Almacenes/>}>
            <Route index element={<Navigate to='lista'/>}/>
            <Route path="lista" element={<ListaAlmacenes/>}>
              {selectedAlmacen.id&& <Route index element={<Navigate to={selectedAlmacen.id}/>} /> }
              <Route path=":nombre" element={<SelectedAlmacen/>} />
            </Route>
            <Route path="historial" element={<HistorialAlmacenes/>} />
          </Route>


          <Route path="ventas" element={<Ventas/>}>
            <Route index element={<Navigate to='tienda'/>}/>
            <Route path="tienda" element={<TiendaVentas/>}/>
            <Route path="clientes" element={<ClientesVentas/>}/>
            <Route path="opciones" element={<OpcionesVentas/>}/>
            <Route path="historial" element={<HistorialVentas/>} />
          </Route>
          <Route path="usuarios" element={<Usuarios/>}>
            <Route index element={<Navigate to='lista'/>}/>
            <Route path="lista" element={<ListaUsuarios/>}/>
          </Route>
        </Route>
      </Routes>

  );
}