import {useState,useRef,MouseEvent,useCallback,useEffect} from 'react'
import {Card,Box,Typography,Button,Menu, MenuItem} from '@mui/material'
import ExpandMoreTwoTone from '@mui/icons-material/ExpandMoreTwoTone';
// TODO: Custom Components 
import Bar from './BarChart'

//TODO: Graphql Import 
import {useQuery} from '@apollo/client'
import {getFelicitacionesForDates} from 'src/graphql/Felicitaciones'

// Periods Menu 
const periods = [
    {
      value_inicial: '2023-01-01T00:00:00.000Z',
      value_final: '2023-12-31T24:00:00.000Z',
      text: 'Actual Año'
    },
    {
      value_inicial: '2022-01-01T00:00:00.000Z',
      value_final: '2022-12-31T24:00:00.000Z',
      text: 'Año 2022'
    },
    {
      value_inicial: '2021-01-01T00:00:00.000Z',
      value_final: '2021-12-31T24:00:00.000Z',
      text: 'Año 2021'
    },
    {
      value_inicial: '2020-01-01T00:00:00.000Z',
      value_final: '2020-12-31T24:00:00.000Z',
      text: 'Año 2020'
    },
    {
      value_inicial: '2019-01-01T00:00:00.000Z',
      value_final: '2019-12-31T24:00:00.000Z',
      text: 'Año 2019'
    }
  ];

const Felicitaciones = () => {
    const actionRef1 = useRef<any>(null);
    const [PeriodOptions, setPeriodOptions] = useState<{text:string,value_inicial:string,value_final:string}>(periods[0])
    const [OpenMenu, setOpenMenu] = useState<boolean>(false)
    const [DataPersonas, setDataPersonas] = useState<any[]>([])
    const [DatosChart, setDatosChart] = useState<{}>({});
    const [DataChart, setDataChart] = useState<any[]>([]);
    // TODO: Hooks Apollo Client ---- Querys ----
    const {refetch: refetchQueryPersonasFeliciationes} = useQuery(getFelicitacionesForDates,{
        variables:{
            where:{
                fecha:{
                    lte:'2023-12-31T24:00:00.000Z',
                    gte:"2023-01-01T00:00:00.000Z"
                }
            }
        },
        onCompleted: (data) => {
            if(data.findManyFelecitaciones.length > 0){
                console.log(data)
                setDataPersonas(data.findManyFelecitaciones)
                let datos_ = serializeData(data.findManyFelecitaciones)
                console.info(datos_)
                debugger
                if(Object.values(datos_).length > 0){
                    setDatosChart(Object.keys(datos_))
                    setDataChart(Object.values(datos_))
                }
            }else{
                setDatosChart({});
                setDataChart([]);
            }
            
        }
    })

    //
    const handleClickMenuItem = (event:MouseEvent<HTMLElement>,index:number) => {
        setPeriodOptions(periods[index])
        setOpenMenu(false)
    }

    //
    const serializeData = useCallback((data) => {
        console.log("data")
        const busqueda = data.reduce((acc,persona,index) => {
            acc[persona.personas.id] = acc[persona.personas.id] + 1 || 1;
            return acc;
        },{});
        console.log(busqueda)
        let datos_ = Object.keys(busqueda)
        let valor = Object.values(busqueda);
        let objects = {};

        for(let i = 0; i < datos_.length; i++ ){
            for(let j = 0; j < data.length; j++){
                if(data[j].personas.id == datos_[i]){
                    objects[`${data[j].personas.apellidos.split(' ')[0]} ${data[j].personas.nombres.split(' ')[0].charAt(0)}`] = valor[i];
                }
            }
        }
        return objects;
    },[PeriodOptions])

    useEffect(() => {
        (async () =>{
            await refetchQueryPersonasFeliciationes({
                where:{
                    fecha:{
                        gte:PeriodOptions.value_inicial,
                        lte:PeriodOptions.value_final
                    }
                }
            })
        })()
      return () => {}
    }, [PeriodOptions])
    

    return (
        <Card sx={{ p: 4, mt: 2, height: { sm: '90vh', xs: '90vh', md: '90vh' } }}>
            <Box display={'flex'} justifyContent="space-between">
                <Typography variant={'h3'} component={'h5'} >Felicitaciones</Typography>
           
                <Box>
                    <Button variant="outlined" size={'medium'} ref={actionRef1}endIcon={<ExpandMoreTwoTone fontSize="small" />} onClick={() => setOpenMenu(true)}>
                        {PeriodOptions.text}
                    </Button>
                    <Menu
                    disableScrollLock
                    anchorEl={actionRef1.current}
                    open={OpenMenu}
                    onClose={() => {
                        setOpenMenu(false)
                    }} 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    >
                    {periods.map((_period,index) => (
                        <MenuItem key={_period.value_final} onClick={(event) => handleClickMenuItem(event,index) }>
                            {_period.text}
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
            </Box>
            <Bar data_chars={DatosChart} series={DataChart} />
        </Card>
    )
}

export default Felicitaciones;