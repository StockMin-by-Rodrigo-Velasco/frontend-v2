import { Route, Routes } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

import LoginBranch from "./branch/LoginBranch";
import ListUsers from "./branch/ListUsers";
import MainAplication from "./main/MainAplication";
import ListaUsuarios from "./users/lista-sm/ListaUsuarios";

import Products from "./products/Products";
import ProductsList from "./products/pr-list/ProductsList";
import ProductsOptions from "./products/pr-options/ProductsOptions";
import ProductsHistory from "./products/pr-history/ProductsHistory";

import Warehouses from "./warehouses/Warehouses";
import WarehouseList from "./warehouses/sm-lista/WarehouseList";
import WarehouseSelected from "./warehouses/sm-lista/WarehouseSelected";
// import TraspasosAlmacenes from "./warehouses/sm-traspasos/TraspasosAlmacenes";
// import HistorialAlmacenes from "./warehouses/sm-historial/HistorialAlmacenes";

import Sales from "./sales/Sales";
// import ClientesVentas from "./sales/sm-clientes/ClientesVentas";
// import HistorialVentas from "./sales/sm-historial/HistorialVentas";
// import OpcionesVentas from "./sales/sm-opciones/OpcionesVentas";
// import TiendaVentas from "./sales/sm-tienda/TiendaVentas";

import Usuarios from "./users/Usuarios";
import WarehousesHistory from "./warehouses/sm-historial/WarehousesHistory";
import Transfers from "./warehouses/sm-traspasos/Transfers";
import Customers from "./sales/sm-customers/Customers";

export default function RoutesMain() {

  
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
            <Route path="list" element={<WarehouseList/>}>
              <Route path=":name" element={<WarehouseSelected/>} />
            </Route>
            <Route path="transfers" element={<Transfers/>} />
            <Route path="history" element={<WarehousesHistory/>} />
          </Route>

          <Route path="sales" element={<Sales/>}>
            {/* <Route path="store" element={<TiendaVentas/>}/> */}
            <Route path="customers" element={<Customers/>}/>
            {/* <Route path="options" element={<OpcionesVentas/>}/> */}
            {/* <Route path="history" element={<HistorialVentas/>} /> */}
          </Route>

          <Route path="users" element={<Usuarios/>}>
            <Route path="list" element={<ListaUsuarios/>}/>
          </Route>
        </Route>
      </Routes>

  );
}