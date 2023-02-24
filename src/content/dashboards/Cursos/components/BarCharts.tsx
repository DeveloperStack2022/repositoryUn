import {Card,Box,Avatar,styled,alpha,Typography} from '@mui/material'
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
      margin: ${theme.spacing(0, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
  );

const BarChart = () => {
    const ApexChartOptions: ApexOptions = {
        chart:{
            height:350,
            type:'area',
           "toolbar": {
            "show": false,
            "offsetX": 0,
            "offsetY": 0,
            "tools": {
                "download": true,
                "selection": true,
                "zoom": true,
                "zoomin": true,
                "zoomout": true,
                "pan": true,
                "reset": true,
                "customIcons": []
            },
            "export": {
                "csv": {
                    "columnDelimiter": ",",
                    "headerCategory": "category",
                    "headerValue": "value"
                },
                "png": {},
                "svg": {}
            },
            "autoSelected": "zoom"
        },
        },
        dataLabels:{
            enabled:false
        },
        series:[
            {
                name:"Cursos",
                data:[
                {
                    x:"2019",
                    y:15
                },
                {
                    "x": "2020",
                    "y": 4
                },
                {
                    "x": "2021",
                    "y": 4
                },
                {
                    "x": "2022",
                    "y": 4
                }]
            }
        ],
        "xaxis": {
            "labels": {
                "trim": true,
                "style": {}
            },
            "tickAmount": "dataPoints",
            "title": {
                "style": {
                    "fontWeight": 700
                }
            }
        },
        "yaxis": {
            "tickAmount": 5,
            "labels": {
                "style": {}
            },
            "title": {
                "style": {
                    "fontWeight": 700
                }
            }
        },
        stroke:{
            curve:'smooth'
        },
       
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        
    }
    return (
        <Card sx={{my:2,p:3}}>
            <Box display={"flex"} alignItems="center">
                <AvatarWrapper>
                    <img
                        alt="BTC"
                        src="/static/images/placeholders/logo/cursos.png"
                    />   
                </AvatarWrapper>
                <Box>
                    <Typography variant="h4" noWrap> Cursos </Typography>
                    <Typography variant="subtitle1" noWrap>todos los periodos lectivos</Typography>
                </Box>
            </Box>
            <Chart
              options={ApexChartOptions}
              series={ApexChartOptions.series}
              type="area"
              height={350}
            />
        </Card>
    )
}

export default BarChart