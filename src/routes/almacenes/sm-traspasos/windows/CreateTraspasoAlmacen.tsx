import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { RootState } from "../../../../redux/store";
import { InputSelect, InputTextarea } from "../../../../components/Input";
import { dateLocal } from "../../../../helpers";
import { useForm } from "../../../../hooks";

interface CreateTraspasoAlmacenProp {
  closeButton: () => void
}

interface DataForm {
  sucursalId: string;
  usuarioId: string;
  almacenOrigenId: string;
  almacenDestinoId: string;
  detalle: string;
}


export default function CreateTraspasoAlmacen({ closeButton }: CreateTraspasoAlmacenProp) {
  const { id: sucursalId, logo, userData } = useSelector((s: RootState) => s.Sucursal);
  const { listaAlmacenes } = useSelector((s: RootState) => s.Almacenes);
  const { listaProductos } = useSelector((s: RootState) => s.Productos);

  const { data: formTraspaso, handleInputChange: onChangeTraspaso } = useForm<DataForm>({ sucursalId, usuarioId: userData.id, almacenOrigenId: '', almacenDestinoId: '', detalle: '' });


  const registrarTraspaso = () => {
    console.log(formTraspaso);

  }


  return (
    <Windows tittle="NUEVO TRASPASO" closeButton={closeButton} >
      <div className="mb-3 px-2 flex" >
        <div className="flex items-center" >
          <img src={logo} alt="logo-sucursal" width='300px' />
        </div>
        <div className="ms-auto" >
          <p><span className="font-bold">Fecha: </span> {dateLocal(Date.now())} </p>
          <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${userData.nombre} ${userData.apellido}`}</span> </p>

          <div className="flex" >
            <InputSelect
              handleInputChange={onChangeTraspaso}
              name="almacenOrigenId"
              options={listaAlmacenes.map(a => ({ name: a.nombre, value: a.id }))}
              placeholder="Origen:"
              value={formTraspaso.almacenOrigenId}
              optionDefault="Sin eleccion"
            />

            <InputSelect
              handleInputChange={onChangeTraspaso}
              name="almacenDestinoId"
              className="ms-2"
              options={listaAlmacenes.map(a => ({ name: a.nombre, value: a.id }))}
              placeholder="Destino:"
              value={formTraspaso.almacenDestinoId}
              optionDefault="Sin eleccion"
            />
          </div>
          {((formTraspaso.almacenDestinoId !== '') && (formTraspaso.almacenOrigenId === formTraspaso.almacenDestinoId) )&&
            <span className="mt-1 text-[12px] bg-warning px-2 rounded-full" >El origen debe ser diferente al destino.</span>
          }

          <InputTextarea value={formTraspaso.detalle} handleInputChange={onChangeTraspaso} name="detalle" placeholder="Detalle" />
        </div>
      </div>

      <div className="p-2 border border-t-secondary flex justify-center" >
        <button
          type="button"
          className="border border-success rounded-full text-success px-3 transition-all duration-200 hover:bg-success hover:text-white"
          onClick={registrarTraspaso}>REGISTRAR TRASPASO DE PRODUCTOS
        </button>

      </div>
    </Windows>
  );
}