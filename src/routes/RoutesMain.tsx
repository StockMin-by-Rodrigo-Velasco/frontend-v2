import { Route, Routes } from "react-router";

import LoginSucursal from "./sucursal/LoginSucursal";
import SucursalUsers from "./sucursal/SucursalUsers";
import LoginSucursalUser from "./sucursal/LoginSucursalUser";
import MainAplication from "./main/MainAplication";


export default function RoutesMain() {
    
  return (
      <Routes>
        <Route index element={<LoginSucursal/> }/>
        <Route path="login-user" element={ <SucursalUsers/> }>
          <Route path=":id" element={ <LoginSucursalUser/> } />
        </Route>
        <Route path="main" element={ <MainAplication/> }>

        </Route>
      </Routes>

  );
}