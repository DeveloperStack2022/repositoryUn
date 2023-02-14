import {FC} from 'react'
import {GET_DATA,TemasData} from '../../../types';

import {
  Button,
  Card,
  Box,
  CardActions,
  Typography,
  Avatar,
  alpha,
  Stack,
  Divider,
  styled,
  useTheme
} from '@mui/material';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const CustomBox = styled(Box)(
  ({theme}) => `
    padding:1rem;
  `
)

// const AvatarWrapper = styled(Avatar)(
//   ({ theme }) => `
//     margin: ${theme.spacing(0, 0, 1, -0.5)};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: ${theme.spacing(1)};
//     padding: ${theme.spacing(0.5)};
//     border-radius: 60px;
//     height: ${theme.spacing(5.5)};
//     width: ${theme.spacing(5.5)};
//     background: ${
//       theme.palette.mode === 'dark'
//         ? theme.colors.alpha.trueWhite[30]
//         : alpha(theme.colors.alpha.black[100], 0.07)
//     };
  
//     img {
//       background: ${theme.colors.alpha.trueWhite[100]};
//       padding: ${theme.spacing(0.5)};
//       display: block;
//       border-radius: inherit;
//       height: ${theme.spacing(4.5)};
//       width: ${theme.spacing(4.5)};
//     }
// `
// );

type PropsComponent = {
  dataOneUser:GET_DATA,
  loading:boolean
}

const WatchListRow:FC<PropsComponent> = ({dataOneUser,loading}) => {

  const theme = useTheme();

  let data:any = []
  let data_nombres = []
  if(!loading){
    const {findManyPersonas} = dataOneUser;
    findManyPersonas.map(elem => {
      data_nombres.push(`${elem.nombres} ${elem.apellidos.charAt(0)}`)
      return data.push(elem._count.invitaciones)
    })
  }
  

  const Box1Options: ApexOptions = {
    
    chart: {
      background: 'transparent',
      type:"bar",
      height:350
    },
    colors: [theme.colors.primary.main,"#E91E63","#9C27B0"],
    theme: {
      mode: theme.palette.mode
    },
    dataLabels:{
      enabled:false
    },
    tooltip: {
    x:{
      show:true,
    },
    y:{
      formatter: function (val){
        if(val > 1 ){
          return `${val} reuniones`
        }
        return `${val} reunion`
      },
      title:{
        formatter: function (seriesName){
          return ""
        },
      },
    },
  },
    xaxis:{
      categories:data_nombres,
    },
    stroke: {
      width: 2,
      colors: ['#fff']
    },
    plotOptions:{
      bar:{
        horizontal:true,  
        borderRadius:4,
      },
      
    }
    
  };

  return (
    <Card sx={{marginTop:2}}>
      {/* {JSON.stringify(data)} */}
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          sx={{
            width: '100%',
            p: 3
          }}
        >
         
          <Box
            sx={{md:{mt:3},sm:{mt:1},xs:{mt:0}}}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  pr: 1,
                  typography:{
                    sm:'h3',
                    xs:'h4'
                  }
                }}
              >
                N. Reuniones
              </Typography>
              
            </Box>
            
          </Box>
          <Box  id="chart">
            <Chart
              options={Box1Options}
              series={[{data:data}]}
              type="bar"
              height={350}
            />
          </Box>
        </Box>
      
      </Stack>
      
      
    </Card>
  );
}

export default WatchListRow;
