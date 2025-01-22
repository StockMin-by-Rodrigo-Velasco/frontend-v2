import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router";
import { verifyTokenSucursalUserByCookieAPI } from "../../redux/sucursal/sucursalThunk";

export default function MainAplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((s:RootState) => s.Sucursal);

  useEffect(() => {
    if( userData.id === '') dispatch(verifyTokenSucursalUserByCookieAPI(navigate));  
  }, [])
  return (
    <div>
      <h1>Hello MainAplication</h1>
    </div>
  );
}