import { FC, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { createOnePersonasT, createOnePersonas } from '../graphql';
// Material UI
import {
  Box,
  Button,
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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const options = [
  {
    label: 'POL',
    value: 'POL'
  },
  {
    label: 'CBOS',
    value: 'CBOS'
  },
  {
    label: 'CBOP',
    value: 'CBOP'
  },
  {
    label: 'SGOS',
    value: 'SGOS'
  },
  {
    label: 'SGOP',
    value: 'SGOP'
  },
  {
    label: 'CPTN',
    value: 'CPTN'
  },
  {
    label: 'SBOS',
    value: 'SBOS'
  },
  {
    label: 'SBOP',
    value: 'SBOP'
  }
];

const MenuItemsIterator = () => {
  return options.map((elem, index) => {
    return (
      <MenuItem key={index} value={elem.value}>
        {elem.label}
      </MenuItem>
    );
  });
};

const validateSchema = z.object({
  grado_policia: z.string().max(4),
  nombre: z.string().max(50),
  apellido: z.string().max(50)
});

type ValidationSchema = z.infer<typeof validateSchema>;

interface IProps {
  open: boolean;
  handleActionsModal: () => void;
  refetch: () => void;
}

const DialogCreatePersona: FC<IProps> = ({ ...props }) => {
  const { open, handleActionsModal, refetch } = props;
  const [create] = useMutation<{}, createOnePersonasT>(createOnePersonas);
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

  const handleSubmitForm: SubmitHandler<ValidationSchema> = async (e) => {
    await create({
      variables: {
        data: {
          gradoPolicial: e.grado_policia,
          nombres: e.nombre,
          apellidos: e.apellido
        }
      },
      onCompleted: () => refetch()
    });

    reset();
    handleActionsModal();
  };

  const handleCancelClick = () => {
    reset();
    handleActionsModal();
  };

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
              render={({ field }) => (
                <Select label="Select Grado" {...field}>
                  {MenuItemsIterator()}
                </Select>
              )}
            />
          </FormControl>
          <Controller
            control={control}
            name={'nombre'}
            render={({ field }) => (
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
            render={({ field }) => (
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
