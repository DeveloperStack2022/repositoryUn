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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from '@mui/material/Typography';
const ListUsers = () => {
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
                primary={'SGOP'}
                secondary={'Ortiz Wilmer'}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  lineHeight: '0.8',
                  minWidth: '100px'
                }}
              >
                <Typography color={'blue'}>
                  <MenuBookIcon />
                </Typography>
                <Typography variant="h5">2 cursos</Typography>
              </Box>
              <Box>
                <Button size="small">Detalle</Button>
              </Box>
            </ListItem>
            <Divider variant="fullWidth" />
            <ListItem>
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
                primary={'Title'}
                secondary={'text body'}
              />
            </ListItem>
            <Divider variant="fullWidth" />
            <ListItem>
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
                primary={'Title'}
                secondary={'text body'}
              />
            </ListItem>
            <Divider variant="fullWidth" />
            <ListItem>
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
                primary={'Title'}
                secondary={'text body'}
              />
            </ListItem>
            <Divider variant="fullWidth" />
            <ListItem>
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
                primary={'Title'}
                secondary={'text body'}
              />
            </ListItem>
            <Divider />
          </List>
        </div>
      </div>
    </Card>
  );
};

export default ListUsers;
