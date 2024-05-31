import React from 'react'
import { Box,Modal,Typography } from '@mui/material'
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Dostosuj szerokość do 90% szerokości okna przeglądarki
  maxWidth: '400px', // Maksymalna szerokość modalu
  bgcolor: 'background.paper',
  heigth: 'auto',
  maxHeight: '110vh',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};


const AuthModal = ({handleClose,open}) => {
  const location = useLocation();
  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>  

          <LoginForm></LoginForm>
         
        </Box>
      </Modal>
    </div>
  );
}

export default AuthModal