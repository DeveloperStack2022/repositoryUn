import { FC, ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  styled,
  IconButton,
  DialogContent,
  Box,
  Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const DialogCustom = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '30%',
    'max-height': 435
  },
  '& .MuiPaper-root': {
    margin: theme.spacing(1)
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const DialogTitleCustomS = styled(DialogTitle)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold}
`
);

const DialogContentCustom = styled(DialogContent)(
  ({ theme }) => `
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    
`
);

const IconCustom = styled(Box)<{ tipo: string }>(
  ({ tipo, theme }) => `
    color: ${
      tipo == 'success'
        ? theme.colors.success.light
        : tipo == 'error'
        ? theme.colors.error.light
        : theme.colors.warning.light
    };
    font-size:150px;
`
);

interface IProps {
  open: boolean;
  handleClose: () => void;
  tipo: 'success' | 'error' | 'wargning';
  message: string;
}

interface IPropsDialogTitle {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

function DialogTitleCustom(props: IPropsDialogTitle) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitleCustomS sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
      {children}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon aria-label="close" />
        </IconButton>
      )}
    </DialogTitleCustomS>
  );
}

const DialogStatus: FC<IProps> = ({ ...props }) => {
  const { open, handleClose, tipo, message, ...other } = props;
  return (
    <DialogCustom open={open}>
      <DialogTitleCustom id="Dialog-title" onClose={handleClose}>
        Modal title
      </DialogTitleCustom>
      <DialogContentCustom>
        {tipo == 'success' ? (
          <CheckCircleIcon color={'success'} sx={{ fontSize: 150 }} />
        ) : tipo == 'error' ? (
          <ErrorIcon sx={{ fontSize: 150 }} />
        ) : (
          <InfoIcon sx={{ fontSize: 150 }} color="warning" />
        )}
        <Typography component="h4" variant="h4">
          {message}
        </Typography>
        <Button variant="contained" sx={{ my: 1, width: 250 }}>
          Agregar mas
        </Button>
        <Button>Close</Button>
      </DialogContentCustom>
    </DialogCustom>
  );
};
export default DialogStatus;
