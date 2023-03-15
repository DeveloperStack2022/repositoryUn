import ApexCharts,{ApexOptions} from "apexcharts";
import Chart from 'react-apexcharts';

//FIXME: Props Component
interface IProps {
    data_chars: {},
    series:any[]
}

const BarChartComponent = ({data_chars,series}:IProps) => {
    const Options: ApexOptions = {
        chart:{
            id:'id_bar',
            background:'transparent',
            toolbar:{show:false},
            type:"bar",
            zoom:{enabled:false}
        },
        colors:['#8c7cf0', 'rgba(140,124,240,0.1)'],
        dataLabels:{enabled:false},
        fill:{opacity:1},
        grid:{borderColor:'rgba(0,0,0,0.112)',strokeDashArray:6},
        legend:{show:false},
        plotOptions:{
            bar:{
                borderRadius:3,
                horizontal:true,
                barHeight:'30px',
            }
        },
        stroke:{
            colors:['transparent'],
            show:true,
            width:3
        },
        xaxis:{
            type:'category',
            axisBorder:{show:false},
            axisTicks:{show:true},
            categories:data_chars,
            floating:false,
        },
        yaxis:{
            labels:{
                style:{
                    colors:'rgba(0,0,0,0.7)',
                    fontWeight:'700'
                }
            }
        },
        tooltip:{
            x:{
                show:true
            },
            y:{
                formatter: (val) => {
                    if(val > 1){
                        return `${val} felicitaciones`
                    }
                    return `${val} felicitacion`
                },
                title:{
                    formatter: (seriesName) => {
                        return ''
                    }
                }
            }
        }
    }
    return(
        <Chart 
            options={Options}
            type={Options.chart.type}
            series={[{data:series}]}
            height={'100%'}
        />
    )
}

export default BarChartComponent