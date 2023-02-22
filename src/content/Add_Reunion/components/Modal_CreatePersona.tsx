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

const options = [
  {
    label:"POL",
    value: 'POL'
  },
  {
    label:"CBOS",
    value: 'CBOS'
  },
  {
    label:"CBOP",
    value: 'CBOP'
  },
  {
    label:"SGOS",
    value: 'SGOS'
  },
  {
    label:"SGOP",
    value: 'SGOP'
  },
]

const MenuItemsIterator = () => {
  return  options.map((elem,index) => {
    return (
      <MenuItem key={index} value={elem.value}>{elem.label}</MenuItem>
    )
  })
}

const validateSchema = z.object({
  grado_policia: z.string().max(4),
  nombre:z.string().max(50),
  apellido: z.string().max(50)
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
      <DialogTitle>Create Persona</DialogTitle>
      <DialogContent dividers>
        <Box component={'form'} onSubmit={handleSubmit(handleSubmitForm)}>
          <FormControl sx={{ width: '100%', marginBottom: '.5rem' }}>
            <InputLabel>S. Grado</InputLabel>
            <Controller
              control={control} 
              name="grado_policia"
              render={({field}) => (
                <Select label="Select Grado" {...field} >
                  {MenuItemsIterator()}
                </Select>
              )}
            />
            
          </FormControl>
          <Controller
            control={control}
            name={'nombre'}
            render={({field}) => (
              <TextField
                {...field}
                sx={{ width: '100%', marginBottom: '.5rem' }}
                label="Nombres"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name={'apellido'}
            render={({field}) => (
              <TextField
                {...field}
                sx={{ width: '100%', marginBottom: '.5rem' }}
                label="Apellidos"
                variant="outlined"
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
