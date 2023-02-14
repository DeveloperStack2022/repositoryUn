import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const user = {
    name: 'Luis Zapata',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Personas
        </Typography>
        <Typography variant="subtitle2">
          {user.name},estos son todas las personas registradas.
        </Typography>
      </Grid>
      
    </Grid>
  );
}

export default PageHeader;
