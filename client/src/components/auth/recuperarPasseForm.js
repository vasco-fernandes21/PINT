import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import api from '../api/api';
import logo from '../../assets/softinsa.svg';
import Swal from 'sweetalert2';
import './login.css';


function RecuperarPasseForm() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleRecuperarPasse = async () => {
        try {
            const response = await api.post('/recuperar-passe', { email });

            Swal.fire({
                title: 'Sucesso!',
                text: response.data.message,
                icon: 'success',
                confirmButtonColor: '#1D324F',
                willClose: () => {
                    navigate('/login');
                },
            });
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.error,
                    icon: 'error',
                    confirmButtonColor: '#1D324F',
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao recuperar a palavra-passe. Por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonColor: '#1D324F',
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRecuperarPasse();
    };

    return (
        <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '54vh' }}>
            <header className="header mb-1">
                <img src={logo} alt="Logo" className="logo" />
            </header>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={{ backgroundColor: '#DCDCDC' }}
                    />
                </div>
                <button className="btn btn-outline-success mt-2" id='botaoEntrar'>
                    RECUPERAR PALAVRA-PASSE
                </button>
                <Link to="/login" className="btn btn-outline-success mt-2" id='botaoEntrar'>
                CANCELAR
                </Link>
            </form>
        </div>
    );
}

export default RecuperarPasseForm;