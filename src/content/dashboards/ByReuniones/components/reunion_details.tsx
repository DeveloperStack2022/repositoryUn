import {
    Card,
    Box,
    Avatar,
    Typography,
    Divider,
    List,
    ListItem,
    Chip
  } from '@mui/material';
  import moment from 'moment';
  import 'moment/locale/es';
  moment.locale('es');
  import ListItemText from '@mui/material/ListItemText';
  
  interface IProps {
    data:any[]
    loading: any
    data_count:any[]
    loading_data_count: any
  }
  
  const UserDetail = ({data,loading,data_count,loading_data_count}:IProps) => {
  
    return (
      <>
      {!loading && !loading_data_count ? (
        <Card sx={{ p: 3, m: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ height: '81px', mr: 2, width: '81px' }}
              variant="rounded"
              ></Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontSize: '1.125rem' }}>
              {data[0].Personas.gradoPolicial}
              </Typography>
              <Typography variant="subtitle2">{data[0].Personas.nombres} {data[0].Personas.apellidos}</Typography>
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
                {data_count[0]._count.invitaciones}
              </Typography>
              <Typography variant="subtitle2" align="center">
                Reuniones
              </Typography>
            </Box>
            <Divider flexItem orientation="vertical" />
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" align="center" gutterBottom>
                {data_count[0]._count.Cursos}
              </Typography>
              <Typography variant="subtitle2" align="center">
                Cursos
              </Typography>
            </Box>
            <Divider flexItem orientation="vertical" />
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" align="center" gutterBottom>
              {data_count[0]._count.Felecitaciones}
              </Typography>
              <Typography variant="subtitle2" align="center">
                Felicitaciones
              </Typography>
            </Box>
          </Box>
          <List>
            {data.map((elem,index) => (
              <>
              <ListItem key={index}>
                <ListItemText
                primaryTypographyProps={{ variant: 'h5' }}
                primary={elem.Invitacion.TipoReunion.tipo_reunion}
                secondaryTypographyProps={{ noWrap: false, variant: 'subtitle2' }}
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography>
                      {elem.Invitacion.tema_ruta.tema_text}
                    </Typography>
                    <Chip
                      size={'small'}  
                      sx={{ mr: { xs: 1, md: 1 }, mb: { xs: 0, md: 0 } }}
                      label={moment(elem.Invitacion.fecha_real).format('DD/MM/YYYY')}
                      color="primary"
                    />
                    
                  </Box>
                }
              />
              </ListItem>
              <Divider />
              </>
            ))}
          </List>
        </Card>
      ):null}
    </>
    );
  };
  
  export default UserDetail;
  