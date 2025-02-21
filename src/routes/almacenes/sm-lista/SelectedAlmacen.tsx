import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../redux/store";

export default function SelectedAlmacen() {
    const navigate = useNavigate();
    const { selectedAlmacen } = useSelector((s:RootState) => s.Almacenes)

    useEffect(() => {

    }, [])
    
  return (
    <div>
      <h1>Hello Aqui un almace</h1>
    </div>
  );
}