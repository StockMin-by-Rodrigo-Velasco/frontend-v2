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
    // Usar el reducer y en y enviar el titulo (tittle) y su descripcion (description)
    dispatch( showNotificationLoading( { tittle:'Loading', description: 'Una descripcion del loading' } ) )
~~~
