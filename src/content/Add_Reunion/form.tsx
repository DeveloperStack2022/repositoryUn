import {useEffect} from 'react'
import {Button,Paper,TextField,Typography,Grid,Select,MenuItem } from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {useForm,Controller,SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import moment from 'moment'

type FormInput = {
    nombrePersona: string;
}
const tipo = ['REUNION','TALLER','VIDEOCONFERENCIA','MESA DE TRABAJO'] as const;
const medio_tipo = ['PRESENCIAL','VIRTUAL'] as const;

// const validateSchema = z.object({
//     nombrePersona: z.string().max(100),
//     tema:z.string(),
//     n_documento:z.string(),
//     tipo:z.enum(tipo),
//     lugar:z.string().max(100),
//     medio_tipo: z.enum(medio_tipo),
//     // fecha_recepcion:z.string(),
//     // fecha_asistencia: z.string(),
//     // hora_asistencia: z.string().datetime()
// })
// type ValidationSchema = z.infer<typeof validateSchema>


const OptionsReuniones = [
    {
        label:"REUNION",
        value: "REUNION"
    },
    {
        label:'TALLER',
        value:'TALLER',
    },
    {
        label:'MESA DE TRABAJO',
        value:'MESA DE TRABAJO'
    },
    {
        label:'VIDEOCONFERENCIA',
        value: 'VIDEOCONFERENCIA'
    }
]

const OptionsAsistencia = [
    {
        label:'PRESENCIAL',
        value: 'PRESENCIAL'
    },
    {
        label:'VIRTUAL',
        value:'VIRTUAL'
    }
]

const GenerateItems =  () => {
    return OptionsReuniones.map((_,index) => {
        return <MenuItem key={index} value={_.value}>{_.label}</MenuItem>
    })
}

const GenerateItemsAsistencia = () => {
    return OptionsAsistencia.map((_,index) => {
        return <MenuItem key={index} value={_.value}>{_.label}</MenuItem>
    })
}

type SchemaForm = {

}


const AddReunion = () => {
    const {handleSubmit,formState:{errors},control} = useForm({mode:"all"})
    const onSubmitHandler = (values) => {
        console.log(values);
      };
    
    useEffect(()=> {
        console.log(errors)
    },[errors])
    return (
       <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} >
            <Typography component="h3" variant="h3" align="center">
                Agregar Reunion
            </Typography>
            <LocalizationProvider  dateAdapter={AdapterMoment}>
            <Grid container spacing={3} sx={{mt:2}}>
                <Grid item xs={12} sm={6}>
                    <Controller control={control} name="nombrePersona" render={({ field}) => (
                        <TextField variant="outlined" {...field} label="Nombre Policia" fullWidth  />
                        )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Controller control={control} name="n_documento" render={({field}) => (
                    <TextField variant="outlined" {...field} label="N. Documento" fullWidth  />
                    )} />    
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Controller control={control} name="tipo" render={({field}) => (
                        <>
                            <Select {...field} label="tipo" sx={{width:"100%"}} defaultValue={"Tipo Reunion"} >
                                {GenerateItems()}
                            </Select>
                        </>
                    )} />    
                </Grid>
                <Grid item xs={6} sm={6}>
                     <Controller control={control} name="medio_tipo" render={({field}) => (
                        <>
                            <Select {...field} label="Tipo Asistencia" sx={{width:"100%"}} defaultValue={"Tipo Reunion"} >
                                {GenerateItemsAsistencia()}
                            </Select>
                        </>
                    )} />    
                </Grid>
                <Grid item xs={12} sm={6}>

                    <Controller control={control} name="lugar" render={({field}) => (
                        <TextField variant="outlined" {...field} label="Lugar" fullWidth  />
                        )} />    
                </Grid>
                <Grid item xs={6} sm={6}>

                <Controller control={control} name="fecha_recepcion" render={({field}) => (
                        <DesktopDatePicker label={"Fecha Recepcion"} inputFormat="MM/DD/YYYY" {...field} renderInput={(params) =>       <TextField {...params} fullWidth />} />
                        )} />    
                </Grid>
                <Grid item xs={6} sm={6}>

                <Controller control={control} name="fecha_asistencia" render={({field:{onChange,value}}) => (
                    <DesktopDatePicker label={"Fecha Asistencia"} inputFormat="MM/DD/YYYY" value={value}  onChange={(event) => {
                        console.log(event)
                    }} renderInput={(params) => <TextField {...params}   fullWidth/>} />
                    )} />   
                </Grid>
                   
               
                <Grid item xs={12} sm={6}>
                    <Controller control={control} name="hora_asistencia" render={({field}) => ( 
                        <TimePicker label="Hora Asistencia"   {...field}  renderInput={(params) => <TextField {...params}  fullWidth /> } />
                        )} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Controller control={control} name="tema" render={({field}) => ( 
                        <TextField variant="outlined" {...field} label="Tema" fullWidth  multiline  />
                        )} />
                </Grid>
            </Grid>
            </LocalizationProvider>
            <Button type={"submit"} variant={"contained"}>Enviar</Button>
        </Paper>
       </form>
    )
}

export default AddReunion;