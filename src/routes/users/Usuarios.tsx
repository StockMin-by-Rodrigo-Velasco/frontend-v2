import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch } from "../../redux/store";
import { getPermissionsAPI } from "../../redux/branch/branchThunk";

export default function Usuarios() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPermissionsAPI());
  }, [])
  return (
    <>
      <Outlet/>
    </>
  );
}