import { FC } from 'react';
import { GET_DATA, TemasData } from '../../../types';

import {  useTheme } from '@mui/material';

import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';


type PropsComponent = {
  dataOneUser: GET_DATA;
  loading: boolean;
  data_chart:{},
  series:any[]
};


const WatchListRow: FC<PropsComponent> = ({ dataOneUser, loading,data_chart,series }) => {
  const theme = useTheme();

  let data: any = [];
  let data_nombres = [];
  if (!loading) {
    const { findManyPersonas } = dataOneUser;
    findManyPersonas.map((elem) => {
      data_nombres.push(` ${elem.apellidos} ${elem.nombres.charAt(0)}`);
      return data.push(elem._count.invitaciones);
    });
    
  }

  const Box1Options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar:{show:false},
      type: 'bar',
      zoom:{enabled:false}
    },
    colors: [theme.colors.primary.main, '#E91E63', '#9C27B0'],
    theme: {
      mode: theme.palette.mode
    },
    dataLabels: {
      enabled: false
    },
    fill:{opacity:1},
    legend:{show:false},
    tooltip: {
      x: {
        show: true
      },
      y: {
        formatter: function (val) {
          if (val > 1) {
            return `${val} reuniones`;
          }
          return `${val} reunion`;
        },
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      }
    },
    xaxis: {
      categories: data_chart
    },
    stroke: {
      width: 2,
      colors: ['#fff']
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4
      }
    }
  };

  return (
    <Chart
      options={Box1Options}
      series={[{ data: series }]}
      type="bar"
      height={'100%'}
    />
  );
};

export default WatchListRow;
