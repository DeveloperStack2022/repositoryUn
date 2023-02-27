import {
  Card,
  Box,
  Avatar,
  styled,
  alpha,
  Typography,
  Paper
} from '@mui/material';
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
    chart: {
      type: 'area',
      background: 'transparent',
      sparkline: {
        enabled: true
      },
      toolbar: {
        show: false
      }
    },
    legend: { show: false },
    markers: { size: 0 },

    series: [
      {
        name: 'Cursos',
        data: [
          {
            x: '2019',
            y: 5
          },
          {
            x: '2020',
            y: 3
          },
          {
            x: '2021',
            y: 2
          },
          {
            x: '2022',
            y: 4
          }
        ]
      }
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '60%',
        horizontal: false
      }
    },

    stroke: {
      colors: ['#3B82F6'],
      width: 3
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy '
      }
    }
  };
  return (
    <Paper
      variant="elevation"
      elevation={1}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '300px',
        mt: 20
      }}
    >
      <Box sx={{ p: '9px 22.5px' }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: '13px',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontFamily:
              'font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";'
          }}
        >
          Test
        </Typography>
        <Typography component={'h2'} variant="h2">
          25
        </Typography>
      </Box>
      <Box sx={{ marginLeft: '18px', flexGrow: 1, pt: 3 }}>
        <Chart
          options={ApexChartOptions}
          series={ApexChartOptions.series}
          type="area"
          height={'55%'}
        />
      </Box>
    </Paper>
  );
};

export default BarChart;
