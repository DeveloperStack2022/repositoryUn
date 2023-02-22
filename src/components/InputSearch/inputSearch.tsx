import * as React from 'react'
import TextField from '@mui/material/TextField'
import {Autocomplete,Typography}  from '@mui/material'
import {TemasData} from '../../types'
import {select_tema} from '../../features/Temas'

interface IPropsComponent {
    loadingTemas:boolean;
    errorTemas:any;
    dataTemas:TemasData
}
import {useAppDispatch} from '../../hooks/redux'

export const Combox:React.FC<IPropsComponent> = ({dataTemas,errorTemas,loadingTemas}) =>{
    // States 
    const [value,setValue] = React.useState<{id:number,label:string}>();

    //Dispatch 
    const dispatch = useAppDispatch()
    const datos = []
    if(!loadingTemas){
        dataTemas.tema_Rutas.map(elem => datos.push({id: elem.id,label:elem.tema_text}))
    }

    React.useEffect(() => {
        dispatch(select_tema({id:value?.id}))
    },[dispatch,value])

    return (
        
    <Autocomplete
        sx={{
            ".MuiAutocomplete-inputRoot":{
                borderRadius:"4px"
            },
            marginBottom:{md:"1rem",sm:'1rem',xs:"1rem"}
        }}
        onChange={(event: React.SyntheticEvent,value) =>{
            setValue(value)
        }}
        options={datos}
        isOptionEqualToValue={(option,value) => option.label.includes(value.label)}
        renderInput={(params) => <TextField {...params}  label="Search tema"  />}
        renderOption={(props,option,{selected}) => (
            <li {...props}>
                <Typography noWrap sx={{fontSize:{md:"1rem",sm:".8rem",xs:".8rem"}}}>
                    {option.label}
                </Typography>
            </li>
        )}
        />
            
    )
}