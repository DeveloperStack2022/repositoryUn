import { NavLink as RouterLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  Divider,
  Box,
  Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


interface IProps {
  data:any[]
  loading: any
}

const ListUsers = ({data,loading}:IProps) => {
  
  return (
    <Card sx={{ height: '237px', mt: 2 }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0px',
            overflow: 'scroll',
            marginRight: '0px',
            marginBottom: '0px'
          }}
        >
          <List disablePadding>
            {!loading && data.map((elem,index) => (
              <>
                <ListItem sx={{ py: 2.7 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ noWrap: true, variant: 'h5' }}
                secondaryTypographyProps={{
                  noWrap: true,
                  variant: 'subtitle2'
                }}
                primary={elem.Personas.gradoPolicial}
                secondary={`${elem.Personas.nombres} ${elem.Personas.apellidos}`}
              />
            
              <Box>
                <Button size="small" variant="outlined" component={RouterLink} disableRipple  to={`/dashboards/CursosId/${elem.Personas.id}`} >Detalle</Button>
              </Box>
            </ListItem>
            <Divider variant="fullWidth" />
              </>
            ))}

          </List>
        </div>
      </div>
    </Card>
  );
};

export default ListUsers;
