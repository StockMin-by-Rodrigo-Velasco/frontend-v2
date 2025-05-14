import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { RootState } from "../../redux/store";
import LoadingModule from "../../components/LoadingModule";


export default function Sales() {
  const { loadingApplication } = useSelector((s: RootState) => s.Aplication);
  // const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();



  useEffect(() => {

  }, [])

  return (
    <>
      { loadingApplication&& <LoadingModule title="Cargando datos de la tienda" />}
      <Outlet />
    </>
  );
}