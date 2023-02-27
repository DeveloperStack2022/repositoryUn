import { useRef, useState, useEffect, MouseEvent, useCallback } from 'react';
import ChartComponent from './BarrasChartTwo';
import { Card, Box, Button, styled, Menu, MenuItem } from '@mui/material';
import { findManyCursosPersonas } from 'src/graphql/cursos';
import { useQuery } from '@apollo/client';

//Custom components
import ExpandMoreTwoTone from '@mui/icons-material/ExpandMoreTwoTone';
import ListUsers from './ListUsers';
// var randomColor = Math.floor(Math.random() * 16777215).toString(16);

const DotPrimaryLight = styled('span')(
  ({ theme }) => `
      border-radius: 22px;
      background: ${theme.colors.primary.lighter};
      width: ${theme.spacing(1.5)};
      height: ${theme.spacing(1.5)};
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);

const DotPrimary = styled('span')(
  ({ theme }) => `
      border-radius: 22px;
      background: ${theme.colors.primary.main};
      width: ${theme.spacing(1.5)};
      height: ${theme.spacing(1.5)};
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);
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

// const serializeData = (data: any[]) => {
//   // forEach

//   const busqueda = data.reduce((acc, persona, index) => {
//     //acc => acumulador
//     //personas => valor Actual del recorrido array
//     acc[persona.Personas.id] = acc[persona.Personas.id] + 1 || 1;
//     return acc;
//   }, {});

//   let datos_ = Object.keys(busqueda);
//   let valor = Object.values(busqueda);
//   let objects = {};

//   for (let i = 0; i < datos_.length; i++) {
//     for (let j = 0; j < data.length; j++) {
//       if (data[j].Personas.id == datos_[i]) {
//         objects[
//           `${data[j].Personas.apellidos.split(' ')[0]} ${data[
//             j
//           ].Personas.nombres
//             .split(' ')[0]
//             .charAt(0)}`
//         ] = valor[i];
//       }
//     }
//   }

//   return objects;
// };

const BarrasCharts = () => {
  const actionRef1 = useRef<any>(null);
  const [DatosChart, setDatosChart] = useState<{}>({});
  const [DataChart, setDataChart] = useState<any[]>([]);
  const [OpenMenu, setOpenMenu] = useState<boolean>(false);
  const [period, setPeriod] = useState<{
    text: string;
    value_inicial: string;
    value_final: string;
  }>(periods[0]);

  //Querys
  const {
    data: DataFindManyPersonas,
    loading: LoadingFindManyPersonas,
    refetch
  } = useQuery(findManyCursosPersonas, {
    variables: {
      where: {
        Cursos: {
          is: {
            fecha_inicio: {
              lte: '2023-12-31T24:00:00.000Z',
              gte: '2023-01-01T00:00:00.000Z'
            }
          }
        }
      }
    },
    onCompleted: (data) => {
      if (data.findManyCursosPersonas.length > 0) {
        let datos_ = serializeData(data.findManyCursosPersonas);
        if (Object.values(datos_).length > 0) {
          setDatosChart(Object.keys(datos_));
          setDataChart(Object.values(datos_));
        }
      } else {
        setDatosChart({});
        setDataChart([]);
      }
    }
  });

  //CallBack
  const serializeData = useCallback(
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

  useEffect(() => {
    (async () => {
      await refetch({
        where: {
          Cursos: {
            is: {
              fecha_inicio: {
                gte: period.value_inicial,
                lte: period.value_final
              }
            }
          }
        }
      });
    })();
    return () => {};
  }, [period]);

  const handleClickMenuItem = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setPeriod(periods[index]);
    setOpenMenu(false);
  };

  return (
    <>
      <Card
        sx={{ p: 4, mt: 2, height: { sm: '90vh', xs: '90vh', md: 'auto' } }}
      >
        <Box display={'flex'} justifyContent="space-between">
          <Button
            variant="outlined"
            size={'medium'}
            ref={actionRef1}
            onClick={() => setOpenMenu(true)}
            endIcon={<ExpandMoreTwoTone fontSize="small" />}
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
        <ChartComponent data_chart={DatosChart} series={DataChart} />
      </Card>
      <ListUsers />
    </>
  );
};

export default BarrasCharts;
