import { FC, useRef} from 'react';
import {useMutation} from '@apollo/client'
import {createOneTema_Ruta,createOneTema_RutaT} from '../graphql'
// Material UI
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
 
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const validateSchema = z.object({
  tema_text: z.string().max(50)
})

type ValidationSchema = z.infer<typeof validateSchema>;

interface IProps {
  open: boolean;
  handleActionsModal: () => void;
  refetch: () => void
}

const DialogCreatePersona: FC<IProps> = ({ ...props }) => {
  const { open,handleActionsModal,refetch } = props;
  const [createOneTema,{}] = useMutation<{},createOneTema_RutaT>(createOneTema_Ruta)
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
  

  const handleSubmitForm:SubmitHandler<ValidationSchema> = async (e) => {
    await createOneTema({
      variables:{
        data:{
          tema_text:e.tema_text
        }
      }
    })
    refetch()
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
