import {useEffect,useState,useRef} from 'react'
import {
    Button,
    Paper,
    TextField,
    Typography,
    Grid,
    Autocomplete,
  } from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker'
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
//TODO: React hooks form
import {useForm,Controller,SubmitHandler} from 'react-hook-form'
import {z} from 'zod'
//TODO: APOLLO CLIENT
import {useQuery,useMutation} from '@apollo/client'
import {findManyPersonas} from 'src/graphql/Personas'
import {createFelicitacion} from 'src/graphql/Felicitaciones'

//TODO: MODAL DIALOG
import ModalCreatePersona from '../../Add_Reunion/components/Modal_CreatePersona'
import ModalDialogMessage from 'src/components/Dialog'


// HANDLE: VALIDATE SCHEAMA ZOD 
const  validateSchema = z.object({
    nombrePersona: z.object({
        label: z.string(),
        value: z.number()
    }),
    fecha_felicitacion: z.preprocess((arg) => {
        if (typeof arg == 'string' || arg instanceof Date) return new Date();
      }, z.date()),
    tipo: z.string(),
    causa:z.string(),
})

type ValidationSchema = z.infer<typeof validateSchema>


//TODO: COMPONENT - FELICIATACIONES
const FormFelicitaciones = () => {
    const fieldRef = useRef(null)

    //TODO: STATES
    const [OpenCreatePersona, setOpenCreatePersona] = useState<boolean>(false);
    const [AddPersona, setAddPersona] = useState<number>(0)
    const [DataPersonas, setDataPersonas] = useState<any[]>([]) 
    const [OpenModalMessage,setOpenModalMessage] = useState<{tipo:"success" | 'wargning' | 'error',message:string}>({tipo:'success',message:''})
    const [ModalDialogMessageActions,setModalDialogMessageActions] = useState<boolean>(false)
    const [Value, setValue] = useState<{label:null | string,value:number}>({label:null,value:0})
    //TODO: REACT HOOKS FORM   
    const {handleSubmit,formState:{errors},control,reset} = useForm<ValidationSchema>({mode:'all'});
 
    //TODO: APOLLO CLIENT
    useQuery(findManyPersonas,{
        onCompleted: (data) => {
            const dataS_ = data.findManyPersonas.map((elem) => {
                return {
                    label: `${elem.gradoPolicial} ${elem.nombres} ${elem.apellidos}`,
                    value: elem.id
                }
            })
            setDataPersonas(dataS_)
        }
    })
    const [createFelicitacionMutation,{}] = useMutation(createFelicitacion)

    const onSubmitHandler:SubmitHandler<ValidationSchema> = async (value) => {
        await createFelicitacionMutation({
            variables:{
                "data": {
                    "fecha": moment.utc(value.fecha_felicitacion).toISOString(),
                    "tipo": value.tipo,
                    "causa": value.causa,
                    "personas": {
                      "connect": {
                        "id": value.nombrePersona.value
                      }
                    }
                }
            },
            onCompleted: (data) => {
                if(data.createOneFelecitaciones){
                    setOpenModalMessage({tipo:'success',message:'Se guardo correctamente'})
                    setValue({label:null,value:0})
                    setModalDialogMessageActions(true)
                    return;
                }
                setOpenModalMessage({tipo:'error',message:'No se guardo corectamente'})
                setModalDialogMessageActions(true)
            }
        })
    }

    //HANDLE HANDL3S 
    const handleClickActionModal = () => setOpenCreatePersona(prev => !prev);
    const handleAddPersona = () => {setAddPersona(prev => prev + 1)}

    const handleCloseModalDialogMessage = () => {
        setModalDialogMessageActions(prev => !prev);
        fieldRef.current.value = null
        reset({
            causa:'',
            fecha_felicitacion: new Date(),
            nombrePersona:{
                label:'',
                value:0
            },
            tipo:''
        });
    }

    return(
        <>
        <ModalCreatePersona open={OpenCreatePersona} handleActionsModal={handleClickActionModal} addPersona={handleAddPersona} />
        <ModalDialogMessage handleClose={handleCloseModalDialogMessage} open={ModalDialogMessageActions} message={OpenModalMessage.message} tipo={OpenModalMessage.tipo} />
        <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete=''>
            <Paper variant="outlined" sx={{my:{xs:3,md:6},p: {xs:2,md:3}}}>
                <Typography variant="h3" align='center'>Agregar felicitaciones</Typography>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid container spacing={3} sx={{my:2}}>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                control={control}
                                name="nombrePersona"
                                render={(props) => (
                                    <Autocomplete
                                        onChange={(_,data) => {
                                            setValue({label:data.label,value:data.value})
                                            props.field.onChange(data)
                                        }}
                                        options={DataPersonas} 
                                        value={Value.label}
                                        {...props}
                                        renderInput={ (params) => (
                                            <TextField  value={params.inputProps.value}  {...params} label={'Nombre Policia'} />
                                            )}
                                            noOptionsText={
                                                <Button 
                                                variant="contained"
                                                size="small" sx={{width:'100%'}} onClick={handleClickActionModal}>
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
                                name='fecha_felicitacion'
                                render={({field}) => (
                                    <DesktopDatePicker 
                                        label='Fecha felicitacion'
                                        inputFormat="DD/MM/YYYY"
                                        value={field.value}
                                        {...field}
                                        renderInput={(params) => (
                                            <TextField value={params.value} {...params} fullWidth />
                                        )}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item  xs={12} sm={6}>
                            <Controller
                                control={control}
                                name="tipo"
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        value={field.value}
                                        {...field}
                                        label="Tipo Felicitacion"
                                        fullWidth
                                        />
                                        )}
                                        />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                control={control}
                                name="causa"
                                render={({ field }) => (
                                    <TextField
                                    value={field.value  }
                                    multiline
                                    maxRows={2}
                                    variant="outlined"
                                    {...field}
                                    label="Causa"
                                    fullWidth
                                    />
                                    )}
                                    />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <Button type="submit" variant="contained">Enviar</Button>
            </Paper>
        </form>
    </>
    )
}

export default FormFelicitaciones;