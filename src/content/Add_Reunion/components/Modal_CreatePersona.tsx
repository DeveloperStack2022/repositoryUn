import { FC, useRef, FormEvent, useState } from 'react';
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

const DialogCreatePersona: FC<IProps> = ({ ...props }) => {
  const { open } = props;
  const [OpenDialog, setOpenDialog] = useState<boolean>(open);

  let elementButton = useRef(null);
  const handleClick = () => {
    elementButton.current.click();
  };
  const handleClose = () => setOpenDialog((prev) => !prev);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit');
    handleClose();
  };
  const handleCancelClick = () => handleClose();

  return (
    <Dialog
      open={OpenDialog}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogTitle>Create Persona</DialogTitle>
      <DialogContent dividers>
        <Box component={'form'} onSubmit={handleSubmitForm}>
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
          <button type="submit" hidden ref={elementButton}></button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCreatePersona;
