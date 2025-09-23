import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { minimizeNavbar } from "../../../redux/aplication/aplicationSlice";

export default function NavbarButton() {
    const {minNavbar} = useSelector((s:RootState) => s.Aplication);
    const dispatch = useDispatch<AppDispatch>();

  return (
    <button 
        className="bg-primary/0 hover:bg-primary/20 rounded-full p-1 me-2 text-primary"
        onClick={() => {dispatch(minimizeNavbar(!minNavbar))}}
        >
      <HiMenu/>
    </button>
  );
}