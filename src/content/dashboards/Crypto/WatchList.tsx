import * as React from 'react';
import WatchListRow from './WatchListRow';
import { useQuery, gql } from '@apollo/client';
import { GET_DATA, TemasData } from '../../../types';
import { useAppSelector } from '../../../hooks/redux';
import {Grid,Card,Box,Button,Menu,MenuItem, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Querys GraphQL
import {personasOnInvitacions,CountReunionesQuery} from 'src/graphql/Reuniones'

//Custom Components
import { Combox } from '../../../components/InputSearch';
import { TableTemas } from '../../../components/Table';
import TableTema from '../../../components/TableTema';
import { CardDropDown } from './Components/CardDropDown';
import ListUser from './ListUsers'

const GET_NUMERO_INVITACIONES = gql`
  query FindManyPersonas {
    findManyPersonas {
      id
      gradoPolicial
      nombres
      apellidos
      _count {
        invitaciones
      }
    }
  }
`;

const GET_TEMA_TEXT = gql`
  query Tema_Rutas {
    tema_Rutas {
      id
      tema_text
    }
  }
`;

const GET_TEMA_WITH_INVITACION = gql`
  query Tema_Ruta($where: Tema_RutaWhereUniqueInput!) {
    tema_Ruta(where: $where) {
      invitacion {
        lugar
        TipoReunion {
          tipo_reunion
        }
        personas {
          Personas {
            gradoPolicial
            nombres
            apellidos
          }
        }
      }
    }
  }
`;

const GET_TEMAS_WITH_INVITACION_PERSONAS = gql`
  query Tema_Rutas {
    tema_Rutas {
      tema_text
      invitacion {
        lugar
        TipoReunion {
          tipo_reunion
        }
        personas {
          Personas {
            gradoPolicial
            nombres
            apellidos
          }
        }
      }
    }
  }
`;
type ReunionData = {
  tema_text: string;
  lugar: [{ lugar: string }];
  tipo_reuinion: [{ tipo_reuinion: string }];
  personas: Persona[];
};
type Persona = {
  gradoPolicial: string;
  nombres: string;
  apellidos: string;
};

const serializeData = function (data: any) {
  return data.tema_Rutas.map((e, index): ReunionData => {
    const tema_text = e.tema_text;
    const lugar = e.invitacion.map((i) => {
      return { lugar: i.lugar };
    });
    const tipo_reuinion = e.invitacion.map((i) => {
      return { tipo_reuinion: i.TipoReunion.tipo_reunion };
    });
    const personas = e.invitacion.map((i) => {
      let valor = i.personas.map((elem): Persona => {
        return {
          gradoPolicial: elem.Personas.gradoPolicial,
          nombres: elem.Personas.nombres,
          apellidos: elem.Personas.apellidos
        };
      });
      return valor;
    });
    return {
      lugar,
      tema_text,
      tipo_reuinion,
      personas
    };
  });
};

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

function WatchList() {
  const actionRef1 = React.useRef()
  const [OpenMenu, setOpenMenu] = React.useState<any>();
  const [period, setPeriodos] = React.useState<{value_inicial:string,value_final:string,text:string}>(periods[0]);
  const [OneTema, setOneTema] = React.useState<any>();
  const [TemasSerialize, setTemasSerialize] = React.useState<any[]>([]);
  const [DataPersonasOnInvitacionState, setDataPersonasOnInvitacionState] = React.useState<any[]>([])
  const [DatosChart, setDatosChart] = React.useState<{}>({})
  const [DataChart, setDataChart] = React.useState<any[]>([])
  const [CountReuniones, setCountReuniones] = React.useState<any[]>([])
  // 
  const { id } = useAppSelector((state) => state.tema);
  const { loading, data, error } = useQuery<GET_DATA>(GET_NUMERO_INVITACIONES);
  const dataQuery = useQuery<TemasData>(GET_TEMA_TEXT);
  const  {data:DataPersonasOnInvitacion,loading:LoadingPersonasInvitacion,refetch: refectchPersonasOnInvitacion} = useQuery(personasOnInvitacions,{
    variables:{
      "where": {
        "Invitacion": {
          "is": {
            "F_Recepcion": {
              "lte": "2023-12-31T24:00:00.000Z",
              "gte": "2023-01-01T00:00:00.000Z"
            },
          }
        }
      }
    },onCompleted: (data) => {
      
      if(data.personasOnInvitacions.length > 0 ){
        setDataPersonasOnInvitacionState(data.personasOnInvitacions);
        let datos_ = serializeDataPersonasOnInvitacion(data.personasOnInvitacions)
        if(Object.values(datos_).length > 0){
          setDatosChart(Object.keys(datos_));
          setDataChart(Object.values(datos_));
        }
      }else {
        setDatosChart({});
        setDataChart([]);
      }
      
    }
  })

  const {loading: LoadingCountReunionesQuery} = useQuery(CountReunionesQuery,{
    onCompleted:(data) => {
      let datos_filtrados = data.findManyPersonas.map(elem => {
        return {
          id: elem.id,
          gradoPolicial: elem.gradoPolicial,
          nombres: elem.nombres,
          apellidos: elem.apellidos,
          reuniones: elem._count.invitaciones
        }
      })
      setCountReuniones(datos_filtrados)
    }
  })

  const getTemaQuery = useQuery(GET_TEMA_WITH_INVITACION, {
    variables: {
      where: {
        id: !id ? 1 : id
      }
    }
  });
  
  const getTemasQuery = useQuery(GET_TEMAS_WITH_INVITACION_PERSONAS);
  
  let datosTemas = [];
  React.useEffect(() => {
    if (getTemasQuery.loading == false) {
      datosTemas = serializeData(getTemasQuery.data);
      setTemasSerialize(datosTemas);
    }
  }, [getTemasQuery.loading]);

  const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>,index:number) => {
    setPeriodos(periods[index])
    setOpenMenu(false)
  }

  const serializeDataPersonasOnInvitacion = React.useCallback(
    (data: any[]) => {
      // forEach

      const busqueda = data.reduce((acc, persona, index) => {
        //acc => acumulador
        //personas => valor Actual del recorrido array
        acc[persona.Personas.id] = acc[persona.Personas.id] + 1 || 1;
        return acc;
      }, {});

      let datos_ = Object.keys(busqueda);
      let valor = Object.values(busqueda);
      let objects = {};

      for (let i = 0; i < datos_.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].Personas.id == datos_[i]) {
            objects[
              `${data[j].Personas.apellidos.split(' ')[0]} ${data[
                j
              ].Personas.nombres
                .split(' ')[0]
                .charAt(0)}`
            ] = valor[i];
          }
        }
      }

      return objects;
    },
    [period]
  );

  React.useEffect(() => {
    (async () => {
      await refectchPersonasOnInvitacion({
        where:{
          Invitacion:{
            is:{
              F_Recepcion:{
                gte:period.value_inicial, //Valor inicial
                lte: period.value_final //Valor final
              }
            }
          }
        }
      })
    })()
  
    return () => {}
  }, [period])
  

  return (
    <>
    <Card sx={{ p: 4, mt: 2, height: { sm: '100vh', xs: '90vh', md: '100vh' } }}>
      <Box display={'flex'} justifyContent="space-between" alignItems={"center"}>
      <Typography variant={'h3'} component={'h5'} >Reuniones</Typography>
      <Button
            variant="outlined"
            size={'medium'}
            ref={actionRef1}
            onClick={() => setOpenMenu(true)}
            endIcon={<ExpandMoreIcon fontSize="small" />}
          >
            {period.text}
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1.current}
            open={OpenMenu}
            onClose={() => {
              setOpenMenu(false);
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
            {periods.map((_period, index) => (
              <MenuItem
                key={_period.value_final}
                onClick={(event) => handleClickMenuItem(event, index)}
              >
                {_period.text}
              </MenuItem>
            ))}
          </Menu>
      
      </Box>
      <WatchListRow data_chart={DatosChart} series={DataChart} dataOneUser={data} loading={loading} />
      
      {/* <Combox
        loadingTemas={dataQuery.loading}
        errorTemas={dataQuery.error}
        dataTemas={dataQuery.data}
      /> */}
      {/* {!id ? (
        <>
          {' '}
          <TableTema
            data_props={getTemasQuery.data}
            data_temas={TemasSerialize}
            loading={getTemasQuery.loading}
          />{' '}
        </>
      ) : (
        <TableTemas
          temas={false}
          data={getTemaQuery.data}
          loading={getTemaQuery.loading}
          error={getTemaQuery.error}
        />
      )} */}

      
    </Card>
    <Grid container>
      <Grid item sm={6} xs={12}>
        <ListUser data={CountReuniones} loading_query={LoadingCountReunionesQuery}  />
      </Grid>
  </Grid>
  </>
  );
}

export default WatchList;
