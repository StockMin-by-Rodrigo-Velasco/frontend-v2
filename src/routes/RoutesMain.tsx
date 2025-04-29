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
  // const { id, userData, listPermissions: listaPermisos } = useSelector((s:RootState) => s.Branch);
  const { selectedAlmacen } = useSelector((s:RootState) => s.Almacenes);
  
  const permisosProductos:Record<string, string> = {};
  const permisosAlmacenes:Record<string, string> = {};
  const permisosVentas:Record<string, string> = {};
  const permisosUsuarios:Record<string, string> = {};
  // const permisosUsuarioSet = new Set(userData.UserPermission.map(p => p.permissionId));

  // for(const p of listaPermisos){
  //   if(p.module === 'productos') permisosProductos[p.code] = p.id;
  //   if(p.module === 'almacenes') permisosAlmacenes[p.code] = p.id;
  //   if(p.module === 'ventas') permisosVentas[p.code] = p.id;
  //   if(p.module === 'usuarios') permisosUsuarios[p.code] = p.id;
  // }

 

  return (
      <Routes>
        <Route index element={<LoginBranch/> }/>
        <Route path="list-users" element={<ListUsers/>}/>
        <Route path="main" element={<MainAplication/>}>
        
          <Route path="products" element={<Products/>}>
            <Route path="list" element={<ProductsList/>}/>
            <Route path="options" element={<ProductsOptions/>}/>
            <Route path="history" element={<ProductsHistory/>} />
          </Route>

          <Route path="warehouses" element={<Warehouses/>}>
            <Route path="list" element={<ListaAlmacenes/>}>
              {selectedAlmacen.id&& <Route index element={<Navigate to={selectedAlmacen.id}/>} /> }
              <Route path=":name" element={<SelectedAlmacen/>} />
            </Route>
            <Route path="transfers" element={<TraspasosAlmacenes/>} />
            <Route path="history" element={<HistorialAlmacenes/>} />
          </Route>
          <Route path="sales" element={<Ventas/>}>
            <Route path="store" element={<TiendaVentas/>}/>
            <Route path="customers" element={<ClientesVentas/>}/>
            <Route path="options" element={<OpcionesVentas/>}/>
            <Route path="history" element={<HistorialVentas/>} />
          </Route>
          <Route path="users" element={<Usuarios/>}>
            <Route path="list" element={<ListaUsuarios/>}/>
          </Route>
        </Route>
      </Routes>

  );
}