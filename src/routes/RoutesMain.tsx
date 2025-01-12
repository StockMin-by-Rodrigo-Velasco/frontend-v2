import { Route, Routes } from "react-router";
import Sucursal from "./sucursal/Sucursal";



export default function RoutesMain() {
  return (
    <Routes>
      <Route index element={ <Sucursal/> } />

    </Routes>
  );
}