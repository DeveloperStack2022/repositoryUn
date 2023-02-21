import { FC } from 'react';
// Material UI
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';

interface IProps {
  open: boolean;
}

const DialogCreatePersona: FC<IProps> = ({ open }) => {
  return (
    <Dialog
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogTitle>Create Persona</DialogTitle>
      <DialogContent dividers>
        <Box component={'form'}>
          <FormControl sx={{ width: '100%', marginBottom: '.5rem' }}>
            <InputLabel>Select Grado</InputLabel>
            <Select label="Select Grado">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ width: '100%', marginBottom: '.5rem' }}
            label="Nombres"
            variant="outlined"
          />
          <TextField
            sx={{ width: '100%', marginBottom: '.5rem' }}
            label="Apellidos"
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreatePersona;
