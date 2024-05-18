import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import api from '../api/api';
import Swal from 'sweetalert2';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSuccess = (response) => {
    const token = response.credential;
    console.log('Google token:', token);
    api.post('/login/google', { token })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setErrorMessage(null);
        Swal.fire({
          title: 'Successo!',
          text: 'Login com a conta Google realizado com sucesso',
          icon: 'success',
          confirmButtonColor: '#1D324F',
          willClose: () => {
            navigate('/');
          },
        });
      })
      .catch(err => {
        console.error('Server error:', err);
        setErrorMessage('Server error. Please try again later.');
      });
  };

  const handleError = () => {
    console.error('Google login failed');
    setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="946771932227-a38o98q56j3dqaubcqk9pho47u76u89n.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
