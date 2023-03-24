import {useForm,SubmitHandler,Controller} from 'react-hook-form';
import {z} from 'zod'
import {useEffect,useState} from 'react'
import {useQuery,useMutation} from '@apollo/client'
import moment from 'moment'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {Paper,Typography,Grid,Autocomplete,TextField,Button,FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import DialogComponent from 'src/components/Dialog'
import ModalCreatePersona from 'src/content/Add_Reunion/components/Modal_CreatePersona'

const validateSchema = z.object({
    persona:z.object({
        label:z.string(),
        id:z.number()
    }),
    nombre_curso:z.string(),
    tipo_curso:z.number(),
    lugar:z.string(),
    fecha_inicio:z.preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date();
      }, z.date()),
    fecha_final:z.preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date();
      }, z.date())
})
type ValidationSchema = z.infer<typeof validateSchema>

//Graphql - 
import {findManyPersonas,findManyPersonasT,Tipo_RS,Tipo_RST,CreateOneCursos,CreateOneCursosT,CreateOneCursosPersonasVariablesT,CreateOneCursosPersonas} from './graphql'


const AddReunion = () => {
    //HACK:States 
    const [PersonasCurso, setPersonasCurso] = useState<{label:string,id:number}>({label:'',id:0})
    const [TipoAsistencia, setTipoAsistencia] = useState<{value:number,children:string}>({value:0,children:''})
    const [DataPersonasState,setDataPersonasState] = useState<any[]>([])
    const [OpenModal,setOpenModal] = useState<boolean>(false)
    const [OpenModalCreate,setOpenModalCreate] = useState<boolean>(false)
    const [TypeState,setTypeState] = useState<{type:"success" | "error" | 'wargning',message:string}>({type:"success",message:""})
    const [AddPersona, setAddPersona] = useState<number>(0)
    const [Value, setValue] = useState<{label: null| string,value:number}>({label:null,value:0}); //FIXME: valores por defecto {label:null,value:0}

    //HANDLE: REACT HOOKS FORM
    const {handleSubmit,control,formState:{errors},reset} = useForm<ValidationSchema>({mode:'all'})
    // GraphQL - Querys 
    const {data,loading:LoadingQueryPersonas,error,refetch:RefetchPersonas} = useQuery<findManyPersonasT>(findManyPersonas,{
        onCompleted: (data) => {
            const parseData = data.findManyPersonas.map(elem => {
                return {
                    label:`${elem.gradoPolicial} ${elem.nombres} ${elem.apellidos}`, 
                    id: elem.id}
            })
            setDataPersonasState(parseData)
        }
    })
    const {data:tipo_curso,loading:loading_tipo_curso} = useQuery<Tipo_RST>(Tipo_RS)
    // GraphQL - Mutations 
    const [createCurso] = useMutation<{createOneCursos:{id:number}},CreateOneCursosT>(CreateOneCursos)
    const [createCursosPersonasRelation] = useMutation<{},CreateOneCursosPersonasVariablesT>(CreateOneCursosPersonas)

    useEffect(() => {
      (async () => {
        await RefetchPersonas()
      })()
      return () => {}
    }, [AddPersona])
    
    //HANDLE 
    const handleActionsModal = () => setOpenModalCreate(prev => !prev);
    const handleAddPersona = () => {setAddPersona(prev => prev + 1 )}
    const handleOpen = () => setOpenModal(prev => !prev)    
    const onSubmitHandler:SubmitHandler<ValidationSchema> = async (value) => {
        console.log(value)
        const {data:DataResponseCreateCourse} = await createCurso({
            variables:{
                data:{
                    fecha_final: moment.utc(value.fecha_final).toISOString(),
                    fecha_inicio:moment.utc(value.fecha_inicio).toISOString(),
                    lugar: value.lugar,
                    nombre_curso: value.nombre_curso,
                    Tipo:{
                        connect:{
                            id: value.tipo_curso
                        }
                    }
                }
            }
        })
       
        const {errors:ErrorType,data:DataType} = await createCursosPersonasRelation({
            variables:{
                data:{
                    Cursos:{
                       connect:{
                        id:DataResponseCreateCourse.createOneCursos.id
                       }
                    },
                    Personas:{
                        connect:{
                            id:value.persona.id
                        }
                    },
                    assignedBy:""
                }
            }
        })
        if(ErrorType) setTypeState({
            type: 'error',
            message: "Hubo un error"
        })
        if(DataType) setTypeState({
            type: 'success',
            message: "Se guardo con exito"
        })
        handleOpen()
        setTipoAsistencia({value:0,children:''})
        setPersonasCurso({label:'',id:0})
        reset({
            persona:{
                id:0,
                label:''
            },
            lugar:'',
            fecha_final:new Date(),
            fecha_inicio: new Date(),
            nombre_curso:'',
            tipo_curso:0
        })
    }   

    return (
        <>
        <ModalCreatePersona  open={OpenModalCreate} addPersona={handleAddPersona} handleActionsModal={handleActionsModal}  />
        <DialogComponent open={OpenModal} handleClose={handleOpen} tipo={TypeState.type} message={TypeState.message}  />
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Paper  variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h3" variant="h3" align="center">
                    Agregar Cursos
                </Typography>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid container spacing={3} sx={{ my: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Controller 
                                control={control}
                                name="persona"
                                render={(props) => (
                                    <Autocomplete
                                        options={DataPersonasState.length > 0 ? DataPersonasState : []}
                                        {...props}
                                        value={Value.label}
                                        renderInput={(params) => (
                                                <TextField {...params} label={'Nombre Policia'} />
                                                )}
                                        onChange={(_,data) => {
                                            setValue({label:data.label,value:data.id})
                                            setPersonasCurso({label:data.label,id: data.id})
                                            props.field.onChange(data)
                                        }}
                                        inputValue={PersonasCurso.label}
                                        noOptionsText={
                                            <Button
                                            onClick={handleActionsModal}
                                            variant="contained"
                                            size="small"
                                                sx={{ width: '100%' }}
                                                >
                                                Crear nueva persona
                                            </Button>
                                        }
                                        /> 
                                        )}
                                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="nombre_curso"
                                render={({ field }) => (
                                    <TextField
                                    variant="outlined"
                                    {...field}
                                    label="Nombre curso"
                                    fullWidth
                                    />
                                    )}
                                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="tipo_curso"
                                render={(props) => (
                                    <FormControl fullWidth>
                                        <InputLabel  id="seleccion">Asistencia</InputLabel>
                                        <Select
                                            label="Asistencia"
                                            sx={{ width: '100%' }}
                                            value={TipoAsistencia.value}
                                            onChange={(_,data:{props:{value:number,children:string}}) => {
                                                setTipoAsistencia({children: data.props.children,value:data.props.value})
                                                props.field.onChange(data.props.value)
                                            }}
                                        >
                                            {!loading_tipo_curso && tipo_curso.tipo_RS.map(elem => <MenuItem key={elem.id} value={elem.id}>{elem.tipo_reunion}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="lugar"
                                render={({ field }) => (
                                    <TextField
                                    variant="outlined"
                                    {...field}
                                    label="Lugar"
                                    fullWidth
                                    />
                                )}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller 
                                control={control}
                                name="fecha_inicio"
                                render={({field}) => (
                                    <DesktopDatePicker
                                    label={'Fecha Inicio'}
                                    inputFormat="DD/MM/YYYY"
                                    {...field}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth />
                                    )}
                                />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller 
                                control={control}
                                name="fecha_final"
                                render={({field}) => (
                                    <DesktopDatePicker
                                    label={'Fecha final'}
                                    inputFormat="DD/MM/YYYY"
                                    {...field}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth />
                                        )}
                                        />
                                        )}
                                        />  
                        </Grid>
                    </Grid>
                    <Button type={'submit'} variant={'contained'}>Agregar</Button>
                </LocalizationProvider>
            </Paper>
        </form>
    </>
    )
}

export default AddReunion