import { useEffect, useState } from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  Autocomplete
} from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Tema_Rutas, findManyPersonas } from './graphql';

//Custom Components
import ModalDialog from './components/Modal_CreatePersona';

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

const validateSchema = z.object({
  nombrePersona: z.string().max(100),
  tema: z.string(),
  n_documento: z.string(),
  tipo: z.enum(tipo),
  lugar: z.string().max(100),
  medio_tipo: z.enum(medio_tipo),
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

const OptionsReuniones = [
  {
    label: 'REUNION',
    value: 'REUNION'
  },
  {
    label: 'TALLER',
    value: 'TALLER'
  },
  {
    label: 'MESA DE TRABAJO',
    value: 'MESA DE TRABAJO'
  },
  {
    label: 'VIDEOCONFERENCIA',
    value: 'VIDEOCONFERENCIA'
  }
];

const OptionsAsistencia = [
  {
    label: 'PRESENCIAL',
    value: 'PRESENCIAL'
  },
  {
    label: 'VIRTUAL',
    value: 'VIRTUAL'
  }
];

const GenerateItems = () => {
  return OptionsReuniones.map((_, index) => {
    return (
      <MenuItem key={index} value={_.value}>
        {_.label}
      </MenuItem>
    );
  });
};

const GenerateItemsAsistencia = () => {
  return OptionsAsistencia.map((_, index) => {
    return (
      <MenuItem key={index} value={_.value}>
        {_.label}
      </MenuItem>
    );
  });
};

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
  // End States

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<ValidationSchema>({ mode: 'all' });

  //Querys - GraphQL -----------------------
  const {
    data: DataPersonas,
    loading: LoadingPersonas,
    error: ErorrPersonas
  } = useQuery(findManyPersonas);
  const {
    data: DataTemasRutas,
    loading: LoadingTemaRutas,
    error: ErrorRutas
  } = useQuery(Tema_Rutas);
  // ---------------------------------------

  //Mutations - GraphQL --------------------

  // ---------------------------------------

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

  const onSubmitHandler: SubmitHandler<ValidationSchema> = (values) => {
    console.log(values);
    console.log('\n' + moment(values.fecha_recepcion).format('DD/MM/YYYY'));
    console.log('\n' + moment(values.fecha_asistencia).format('DD/MM/YYYY'));
    console.log('\n' + moment(values.hora_asistencia).format('HH:mm'));
  };

  return (
    <>
      <ModalDialog open={true} />
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
                  render={({ field }) => (
                    <Autocomplete
                      options={DataPersonasState}
                      {...field}
                      renderInput={(params) => (
                        <TextField {...params} label={'Nombre Policia'} />
                      )}
                      noOptionsText={
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ width: '100%' }}
                        >
                          Create Persona
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
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        label="tipo"
                        sx={{ width: '100%' }}
                        defaultValue={'Tipo Reunion'}
                      >
                        {GenerateItems()}
                      </Select>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  control={control}
                  name="medio_tipo"
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        label="Tipo Asistencia"
                        sx={{ width: '100%' }}
                        defaultValue={'Tipo Reunion'}
                      >
                        {GenerateItemsAsistencia()}
                      </Select>
                    </>
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
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      {...field}
                      label="Tema"
                      fullWidth
                      multiline
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
