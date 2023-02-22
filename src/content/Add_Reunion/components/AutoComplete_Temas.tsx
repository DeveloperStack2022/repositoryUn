import {FC,useState} from 'react'
import {Autocomplete,Typography,TextField,Button} from '@mui/material'
import {TemasData} from '../type'

interface IPropsComponent {
    loading: boolean;
    error:any;
    data: TemasData,
    field:any
    handleClickActions: () => void
}

const InputSearch:FC<IPropsComponent> = ({...props}) => {
    const {loading,error,data,field,handleClickActions} = props;
    //States 
    const [Values, setValues] = useState<{id:number,label:string}>()
    //End States
    return (
        <Autocomplete {...field}
            options={data}
            renderInput={(params) => <TextField {...params} /> }
            label={"Tema"}
            noOptionsText={
                <Button
                  variant="contained"
                  size="small"
                  sx={{ width: '100%' }}
                  onClick={handleClickActions}
                >
                  Crear Tema
                </Button>
              }
        />
    )
}
export default InputSearch