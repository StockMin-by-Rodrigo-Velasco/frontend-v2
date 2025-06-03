## DESARROLLO

### Instalar dependencias
    - npm i

### Iniciar proyecto
    - npm run dev

### Uso de Hooks
~~~
const dispatch = useDispatch<AppDispatch>();
const { reducer } = useSelector((s: RootState) => s.Slice)
~~~
### Uso de CustomHooks
#### useForm
~~~
// Crear la interface del formulario
interface FormularioInterface {
nit: string;
password: string;
}
// Crear la interface del formulario
const initialForm: FormularioInterface = { nit:'', password:''}
// Iniciar hook con el InitialForm
const {data, handleInputChange} = useForm<FormularioInterface>(initialForm);
~~~

### Uso de Componentes
#### Notificaciones
~~~
// Usar el reducer y enviar el titulo (tittle) con su descripcion (description)
dispatch( showNotificationLoading( { tittle:'Loading', description: 'Una descripcion del loading' } ) )
~~~
## DEPLOY
  ### GitHub (Hacer un npm run build primero para verificar que la app se construya bien)
  1. Guardar todos los cambios en una rama (git push)
  2. Cambiar a la rama de despliegue (git checkout deploy)
  3. Mover los cambios realisados a la rama de despliegue (git merge main)
  4. Subir los cambios al repositorio GitHub (git push)
