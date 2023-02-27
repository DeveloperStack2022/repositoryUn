import {
  Card,
  Box,
  Avatar,
  Typography,
  Divider,
  useTheme,
  List,
  ListItem,
  Chip
} from '@mui/material';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import ListItemText from '@mui/material/ListItemText';
const UserDetail = () => {
  const theme = useTheme();
  const formatFecha = moment();
  return (
    <Card sx={{ p: 3, m: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{ height: '81px', mr: 2, width: '81px' }}
          variant="rounded"
        ></Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1.125rem' }}>
            SGOP
          </Typography>
          <Typography variant="subtitle2">Wilmer Ortiz</Typography>
        </Box>
      </Box>
      <Box
        display={'flex'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          mb: 3,
          mt: 4
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" align="center" gutterBottom>
            3
          </Typography>
          <Typography variant="subtitle2" align="center">
            Reuniones
          </Typography>
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" align="center" gutterBottom>
            5
          </Typography>
          <Typography variant="subtitle2" align="center">
            Cursos
          </Typography>
        </Box>
        <Divider flexItem orientation="vertical" />
        <Box sx={{ p: 2 }}>
          <Typography variant="h3" align="center" gutterBottom>
            8
          </Typography>
          <Typography variant="subtitle2" align="center">
            Felicitaciones
          </Typography>
        </Box>
      </Box>
      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5' }}
            primary={'Curso'}
            secondaryTypographyProps={{ noWrap: false, variant: 'subtitle2' }}
            secondary={
              <Box sx={{ mt: 0.5 }}>
                <Typography>
                  PARTICIPACION DE LOS ORGANISMOS NACIONALES DE SEGURIDAD EN LA
                  SEGURIDAD ECOLOGICA DEL PAIS
                </Typography>
                <Chip
                  sx={{ mr: { xs: 1, md: 1 }, mb: { xs: 0, md: 0 } }}
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="primary"
                />
                <Chip
                  variant="outlined"
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="success"
                />
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5' }}
            primary={'Curso'}
            secondaryTypographyProps={{ noWrap: false, variant: 'subtitle2' }}
            secondary={
              <Box sx={{ mt: 0.5 }}>
                <Typography>
                  PARTICIPACION DE LOS ORGANISMOS NACIONALES DE SEGURIDAD EN LA
                  SEGURIDAD ECOLOGICA DEL PAIS
                </Typography>
                <Chip
                  sx={{ mr: { xs: 1, md: 1 }, mb: { xs: 0, md: 0 } }}
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="primary"
                />
                <Chip
                  variant="outlined"
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="success"
                />
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5' }}
            primary={'Curso'}
            secondaryTypographyProps={{ noWrap: false, variant: 'subtitle2' }}
            secondary={
              <Box sx={{ mt: 0.5 }}>
                <Typography>
                  PARTICIPACION DE LOS ORGANISMOS NACIONALES DE SEGURIDAD EN LA
                  SEGURIDAD ECOLOGICA DEL PAIS
                </Typography>
                <Chip
                  sx={{ mr: { xs: 1, md: 1 }, mb: { xs: 0, md: 0 } }}
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="primary"
                />
                <Chip
                  variant="outlined"
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="success"
                />
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primaryTypographyProps={{ variant: 'h5' }}
            primary={'Curso'}
            secondaryTypographyProps={{ noWrap: false, variant: 'subtitle2' }}
            secondary={
              <Box sx={{ mt: 0.5 }}>
                <Typography>
                  PARTICIPACION DE LOS ORGANISMOS NACIONALES DE SEGURIDAD EN LA
                  SEGURIDAD ECOLOGICA DEL PAIS
                </Typography>
                <Chip
                  sx={{ mr: { xs: 1, md: 1 }, mb: { xs: 0, md: 0 } }}
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="primary"
                />
                <Chip
                  variant="outlined"
                  label={formatFecha.format('DD/MM/YYYY')}
                  color="success"
                />
              </Box>
            }
          />
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
};

export default UserDetail;
