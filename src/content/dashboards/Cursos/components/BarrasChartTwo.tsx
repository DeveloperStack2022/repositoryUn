import {useEffect} from 'react'
import ApexCharts,{ApexOptions} from 'apexcharts'
import Chart from 'react-apexcharts';
interface IProps {
  data_chart: {};
  series: any[];
}
const BarrasChartTwo = ({ data_chart, series }: IProps) => {
  const Options: ApexOptions = {
    chart: {
      id:'id_barras',
      background: 'transparent',
      toolbar: { show: false },
      type: 'bar',
      zoom: { enabled: false }
    },
    colors: ['#8c7cf0', 'rgba(140,124,240,0.1)'],
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: { borderColor: 'rgba(0,0,0,0.112)', strokeDashArray: 6 },
    legend: { show: false },
    plotOptions: {
      bar: {
        borderRadius: 3,
        horizontal: true,
        barHeight: '30px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 3
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: true },
      categories: data_chart
    },
    yaxis: {
      labels: {
        style: { 
          colors: 'rgba(0,0,0,0.7)',
          fontWeight: '700'
        },
      },
    },
    tooltip:{
      x:{
        show:true
      },
      y:{
        formatter: function(val) {
          if(val > 1){
            return `${val} cursos`
          }
          return `${val} curso`
        },
        title: {
          formatter: function (seriesName) {
            return ''
          },
        }
      }
    }
  };
  return (
    <Chart
      id="id_barras"
      options={Options}
      type={Options.chart.type}
      series={[{ data: series }]}
      height={'100%'}
    />
  );
};
export default BarrasChartTwo;
