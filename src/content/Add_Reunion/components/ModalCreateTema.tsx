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
  TextField,
 
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const validateSchema = z.object({
  tema_text: z.string().max(50)
})

type ValidationSchema = z.infer<typeof validateSchema>;

interface IProps {
  open: boolean;
  handleActionsModal: () => void;
}

const DialogCreatePersona: FC<IProps> = ({ ...props }) => {
  const { open,handleActionsModal } = props;
  //React hooks form 
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<ValidationSchema>({ mode: 'all' });

  let elementButton = useRef(null);
  const handleClick = () => {
    elementButton.current.click();
  };
  

  const handleSubmitForm:SubmitHandler<ValidationSchema> = (e) => {
    console.log(e)
    reset()
    handleActionsModal();
  };

  const handleCancelClick = () => {
    reset()
    handleActionsModal()
  }

  return (
    <Dialog
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
    >
      <DialogTitle>Create Tema</DialogTitle>
      <DialogContent dividers>
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
          <Controller
            control={control}
            name={'tema_text'}
            render={({field}) => (
              <TextField
                {...field}
                sx={{ width: '100%', marginBottom: '.5rem' }}
                label="Tema text"
                variant="outlined"
                multiline
              />
            )}
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
