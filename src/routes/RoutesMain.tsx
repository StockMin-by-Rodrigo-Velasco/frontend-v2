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
import TiendaVentas from "./ventas/sm-tienda/TiendaVentas";
import Usuarios from "./usuarios/Usuarios";
import TraspasosAlmacenes from "./almacenes/sm-traspasos/TraspasosAlmacenes";

export default function RoutesMain() {
  const { id, userData, listaPermisos } = useSelector((s:RootState) => s.Sucursal);
  const { selectedAlmacen } = useSelector((s:RootState) => s.Almacenes);
  
  const permisosProductos:Record<string, string> = {};
  const permisosAlmacenes:Record<string, string> = {};
  const permisosVentas:Record<string, string> = {};
  const permisosUsuarios:Record<string, string> = {};
  const permisosUsuarioSet = new Set(userData.UsuarioPermiso.map(p => p.permisoId));

  for(const p of listaPermisos){
    if(p.modulo === 'productos') permisosProductos[p.codigo] = p.id;
    if(p.modulo === 'almacenes') permisosAlmacenes[p.codigo] = p.id;
    if(p.modulo === 'ventas') permisosVentas[p.codigo] = p.id;
    if(p.modulo === 'usuarios') permisosUsuarios[p.codigo] = p.id;
  }

 

  return (
      <Routes>
        <Route index element={<LoginSucursal/> }/>
        <Route path="login-user" element={id? <SucursalUsers/> : <Navigate to='/'/>}>
          <Route path=":id" element={ <LoginSucursalUser/> } />
        </Route>
        <Route path="main" element={ userData? <MainAplication/> : <Navigate to='/login-user'/> }>
        
          <Route path="productos" element={<Productos/>}>
            {/* <Route index element={<Navigate to='lista'/>}/> */}
            <Route path="lista" element={permisosUsuarioSet.has(permisosProductos['pr-01'])? <ListaProductos/>:<Navigate to='/main'/>}/>
            <Route path="opciones" element={permisosUsuarioSet.has(permisosProductos['pr-02'])? <OpcionesProductos/>:<Navigate to='/main'/>}/>
            <Route path="historial" element={permisosUsuarioSet.has(permisosProductos['pr-03'])?<HistorialProductos/>:<Navigate to='/main'/>} />
          </Route>

          <Route path="almacenes" element={<Almacenes/>}>
            {/* <Route index element={<Navigate to='lista'/>}/> */}
            <Route path="lista" element={permisosUsuarioSet.has(permisosAlmacenes['al-01'])?<ListaAlmacenes/>:<Navigate to='/main'/>}>
              {selectedAlmacen.id&& <Route index element={<Navigate to={selectedAlmacen.id}/>} /> }
              <Route path=":nombre" element={permisosUsuarioSet.has(permisosAlmacenes['al-01'])?<SelectedAlmacen/>:<Navigate to='/main'/>} />
            </Route>
            <Route path="traspasos" element={permisosUsuarioSet.has(permisosAlmacenes['al-02'])?<TraspasosAlmacenes/>:<Navigate to='/main'/>} />
            <Route path="historial" element={permisosUsuarioSet.has(permisosAlmacenes['al-03'])?<HistorialAlmacenes/>:<Navigate to='/main'/>} />
          </Route>


          <Route path="ventas" element={<Ventas/>}>
            {/* <Route index element={<Navigate to='tienda'/>}/> */}
            <Route path="tienda" element={permisosUsuarioSet.has(permisosVentas['ve-01'])?<TiendaVentas/>:<Navigate to='/main'/>}/>
            <Route path="clientes" element={permisosUsuarioSet.has(permisosVentas['ve-02'])?<ClientesVentas/>:<Navigate to='/main'/>}/>
            <Route path="opciones" element={permisosUsuarioSet.has(permisosVentas['ve-03'])?<OpcionesVentas/>:<Navigate to='/main'/>}/>
            <Route path="historial" element={permisosUsuarioSet.has(permisosVentas['ve-04'])?<HistorialVentas/>:<Navigate to='/main'/>} />
          </Route>
          <Route path="usuarios" element={<Usuarios/>}>
            {/* <Route index element={<Navigate to='lista'/>}/> */}
            <Route path="lista" element={ permisosUsuarioSet.has(permisosUsuarios['us-01'])? <ListaUsuarios/> : <Navigate to='/main'/>  }/>
          </Route>
        </Route>
      </Routes>

  );
}