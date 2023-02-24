import { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  Autocomplete,
  InputLabel,
  FormControl 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import moment from 'moment';
import { useQuery,useMutation } from '@apollo/client';
//
import { Tema_Rutas, findManyPersonas,CreateOneInvitacion,CreatePersonasOnInvitacion,TipoReunion,TipoReunionT,Tipo_RS,Tipo_RST } from './graphql';

//Custom Components
import ModalDialog from './components/Modal_CreatePersona';
import TemaSearchInput from './components/AutoComplete_Temas'
import ModalDialogTema from './components/ModalCreateTema'

type FormInput = {
  nombrePersona: string;
};
const tipo = [
  'REUNION',
  'TALLER',
  'VIDEOCONFERENCIA',
  'MESA DE TRABAJO'
] as const;
const medio_tipo = ['PRESENCIAL', 'VIRTUAL'] as const;

const tipo_reunion = z.object({
  id:z.number(),
  tipo_reunion: z.string()
})
const medio_ = z.object({
  id:z.number(),
  tipo_reunion:z.string()
})
const Persona = z.object({
  label:z.string(),
  value:z.number()
});
const Tema = z.object({
  id: z.number(),
  label:z.string()
})

const validateSchema = z.object({
  nombrePersona: Persona,
  tema: Tema,
  n_documento: z.string(),
  tipo: tipo_reunion,
  medio_tipo: medio_,
  lugar: z.string().max(100),
  fecha_recepcion: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date();
  }, z.date()),
  fecha_asistencia: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date();
  }, z.date()),
  hora_asistencia: z.preprocess((arg) => {
    if (typeof arg == 'string' || arg instanceof Date) return new Date();
  }, z.date())
});

type ValidationSchema = z.infer<typeof validateSchema>;

// ###############################################################
const AddReunion = () => {
  // Initialize states
  const [DataPersonasState, setDataPersonas] = useState<
    [
      {
        label: string;
        value: number;
      }
    ]
  >([{ label: '', value: 0 }]);
  const [TemaData,setTemaData] = useState<[{id:number,label:string}]>()
  const [OpenModal,setOpenModal] = useState<boolean>(false)
  const [OpenModalCreateTema, setOpenModalCreateTema] = useState<boolean>(false)

  // End States
  // react-hook-form -----------------------------
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ValidationSchema>({ mode: 'all' });
  //End react-hook-form --------------------------
  //Querys - GraphQL -----------------------------
  const {
    data: DataPersonas,
    loading: LoadingPersonas,
    error: ErorrPersonas,
    refetch: refetchPersonas
  } = useQuery(findManyPersonas);
  const {
    data: DataTemasRutas,
    loading: LoadingTemaRutas,
    error: ErrorTemasRutas,
    refetch:refetchTemasRutas
  } = useQuery(Tema_Rutas);
  const {data:DataTipoReunion,loading:LoadingTipoReunion} = useQuery<TipoReunionT>(TipoReunion)
  const {data:DataTipo_RS,loading:LoadingTipo_RS} = useQuery<Tipo_RST>(Tipo_RS)
  // ---------------------------------------

  //Mutations - GraphQL --------------------
  const [createInvitacion,{loading:LoadingCreateInvitacion,error}] = useMutation(CreateOneInvitacion)
  const [createPersonaOnInvitacion,{data:dataCreatePersonaOnInvitacion,loading:loadingCreatePersonaOnInvitacion,error:errorCreatePersonaOnInvitacion}] = useMutation(CreatePersonasOnInvitacion)
  // ---------------------------------------
 

  useEffect(() => {
    if(LoadingTemaRutas == false){
      const temaRutaSerializada =  DataTemasRutas.tema_Rutas.map(elem => {
        return {
          id:elem.id,
          label:elem.tema_text
        }
      })
      setTemaData(temaRutaSerializada)
    }
    return () => {}
  }, [LoadingTemaRutas])
  
  useEffect(() => {
    
    if (LoadingPersonas == false) {
      // Serialize Data

      const datosSerializados = DataPersonas.findManyPersonas.map((elem) => {
        return {
          label: `${elem.gradoPolicial} ${elem.nombres} ${elem.apellidos}`,
          value: elem.id
        };
      });
      setDataPersonas(datosSerializados);
    }
    return () => {};
  }, [LoadingPersonas]);

  const onSubmitHandler: SubmitHandler<ValidationSchema> = async (values) => {

    const {data:DataResponse} = await createInvitacion({variables:{
      data: {
        "F_Recepcion": moment(values.fecha_recepcion).format('DD/MM/YYYY'),
        "fecha_real": moment(values.fecha_asistencia).format('DD/MM/YYYY'),
        "N_Documento": values.n_documento,
        "hora": moment(values.hora_asistencia).format('HH:mm'),
        "lugar": values.lugar,
        "TipoReunion": {
          "connect": {
            "id": values.tipo
          }
        },
        "tema_ruta": {
          "connect": {
            "id": values.tema.id
          }
        },
        "Tipo_R": {
          "connect": {
            "id": values.medio_tipo
          }
        },
      }
    }})
   
    createPersonaOnInvitacion({variables:{
      "personaId": values.nombrePersona.value,
      "invitacionId": DataResponse.createOneInvitacion.id
    }}) 
  };

  //Actions Modal Dialogs 
  const handleActionsModal = () => setOpenModal(prev => !prev);
  const handleClickActionModalTema = () => {setOpenModalCreateTema(prev => !prev)}
  //

  return (
    <>
      <ModalDialog open={OpenModal} handleActionsModal={handleActionsModal} refetch={refetchPersonas} />
      <ModalDialogTema open={OpenModalCreateTema} handleActionsModal={handleClickActionModalTema} refetch={refetchTemasRutas} />

      <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h3" variant="h3" align="center">
            Agregar Reunion
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container spacing={3} sx={{ my: 2 }}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="nombrePersona"
                  render={(props) => (
                    <Autocomplete
                      options={DataPersonasState}
                      {...props}
                      renderInput={(params) => (
                        <TextField {...params} label={'Nombre Policia'} />
                      )}
                      onChange={(_,data) => props.field.onChange(data)}
                      noOptionsText={
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ width: '100%' }}
                          onClick={handleActionsModal}
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
                  name="n_documento"
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      label="N. Documento"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                
                <Controller
                  control={control}
                  name="tipo"
                  render={(props) => (
                    <FormControl fullWidth>
                      <InputLabel id="seleccion">Tipo</InputLabel>
                      <Select
                        id="seleccion"
                        {...props}
                        label="Tipo"
                        sx={{ width: '100%' }}
                        defaultValue={'Tipo Reunion'}
                        onChange={(_,data:{props:{value:number}}) => props.field.onChange(data.props.value)}
                      >
                       {!LoadingTipoReunion && DataTipoReunion.tipoReunions.map(elem => <MenuItem key={elem.id} value={elem.id}>{elem.tipo_reunion}</MenuItem>)}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  control={control}
                  name="medio_tipo"
                  render={(props) => (
                    <FormControl fullWidth>
                      <InputLabel  id="seleccion">Asistencia</InputLabel>
                      <Select
                        {...props}
                        label="Asistencia"
                        sx={{ width: '100%' }}
                        defaultValue={'Tipo Reunion'}
                        onChange={(_,data:{props:{value:number}}) => {
                          props.field.onChange(data.props.value)
                        }}
                      >
                        {!LoadingTipo_RS && DataTipo_RS.tipo_RS.map(elem => <MenuItem key={elem.id} value={elem.id}>{elem.tipo_reunion}</MenuItem>)}
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
              <Grid item xs={6} sm={6}>
                <Controller
                  control={control}
                  name="fecha_recepcion"
                  render={({ field }) => (
                    <DesktopDatePicker
                      label={'Fecha Recepcion'}
                      inputFormat="DD/MM/YYYY"
                      {...field}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  control={control}
                  name="fecha_asistencia"
                  render={({ field }) => (
                    <DesktopDatePicker
                      label={'Fecha Asistencia'}
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
                  name="hora_asistencia"
                  render={({ field }) => (
                    <TimePicker
                      label="Hora Asistencia"
                      {...field}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller 
                  control={control} 
                  name="tema" 
                  render={(props) => (
                    <Autocomplete
                      {...props}
                      options={TemaData}
                      renderInput={(params) => (
                        <TextField {...params} label="Tema" variant="outlined" />
                      )}
                      onChange={(_,data) => props.field.onChange(data)}
                      noOptionsText={
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ width: '100%' }}
                          onClick={handleClickActionModalTema}
                        >
                          Crear nuevo tema
                        </Button>
                      }
                    />
                  )}
                />
                
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Button type={'submit'} variant={'contained'}>
            Enviar
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default AddReunion;
