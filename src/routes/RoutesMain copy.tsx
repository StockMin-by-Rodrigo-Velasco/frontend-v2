import { Navigate, Route, Routes } from "react-router";

import LoginBranch from "./branch/LoginBranch";
import ListUsers from "./branch/ListUsers";
import LoginUser from "./branch/windows/LoginUser";
import MainAplication from "./main/MainAplication";
import Ventas from "./sales/Ventas";
import ListaUsuarios from "./users/lista-sm/ListaUsuarios";

import Products from "./products/Products";
import ProductsList from "./products/pr-list/ProductsList";
import ProductsOptions from "./products/pr-options/ProductsOptions";
import ProductsHistory from "./products/pr-history/ProductsHistory";

import Warehouses from "./warehouses/Warehouses";
import ListaAlmacenes from "./warehouses/sm-lista/ListaAlmacenes";
import HistorialAlmacenes from "./warehouses/sm-historial/HistorialAlmacenes";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SelectedAlmacen from "./warehouses/sm-lista/SelectedAlmacen";
import ClientesVentas from "./sales/sm-clientes/ClientesVentas";
import HistorialVentas from "./sales/sm-historial/HistorialVentas";
import OpcionesVentas from "./sales/sm-opciones/OpcionesVentas";
import TiendaVentas from "./sales/sm-tienda/TiendaVentas";
import Usuarios from "./users/Usuarios";
import TraspasosAlmacenes from "./warehouses/sm-traspasos/TraspasosAlmacenes";

export default function RoutesMain() {
  const { id, userData, listPermissions: listaPermisos } = useSelector((s:RootState) => s.Branch);
  const { selectedAlmacen } = useSelector((s:RootState) => s.Almacenes);
  
  const permisosProductos:Record<string, string> = {};
  const permisosAlmacenes:Record<string, string> = {};
  const permisosVentas:Record<string, string> = {};
  const permisosUsuarios:Record<string, string> = {};
  const permisosUsuarioSet = new Set(userData.UserPermission.map(p => p.permissionId));

  for(const p of listaPermisos){
    if(p.module === 'productos') permisosProductos[p.code] = p.id;
    if(p.module === 'almacenes') permisosAlmacenes[p.code] = p.id;
    if(p.module === 'ventas') permisosVentas[p.code] = p.id;
    if(p.module === 'usuarios') permisosUsuarios[p.code] = p.id;
  }

 

  return (
      <Routes>
        <Route index element={<LoginBranch/> }/>
        <Route path="list-users" element={id? <ListUsers/> : <Navigate to='/'/>}>
          <Route path=":id" element={ <LoginUser/> } />
        </Route>
        <Route path="main" element={ userData.id !== ''? <MainAplication/> : <Navigate to='/login-user'/> }>
        
          <Route path="productos" element={<Products/>}>
            {/* <Route index element={<Navigate to='lista'/>}/> */}
            <Route path="lista" element={permisosUsuarioSet.has(permisosProductos['pr-01'])? <ProductsList/>:<Navigate to='/main'/>}/>
            <Route path="opciones" element={permisosUsuarioSet.has(permisosProductos['pr-02'])? <ProductsOptions/>:<Navigate to='/main'/>}/>
            <Route path="historial" element={permisosUsuarioSet.has(permisosProductos['pr-03'])?<ProductsHistory/>:<Navigate to='/main'/>} />
          </Route>

          <Route path="almacenes" element={<Warehouses/>}>
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