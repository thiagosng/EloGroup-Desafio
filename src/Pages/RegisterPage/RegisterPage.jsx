import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../redux/actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // redefinir status de login
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password && user.confirmPassword) {
            if(user.password === user.confirmPassword) {
                dispatch(userActions.register(user));
            } else {
                alert('Senhas não conferem');
            }
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Registrar</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Primeiro Nome</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">Primeiro nome é requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Ultimo Nome</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Ultimo nome é requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Usuário</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange}  required="required" className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Nome do usuário é requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')}
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@+#$])[a-zA-Z0-9@+#$]{8,50}$" title="Password deve possuir ao menos 8 caracteres, contendo ao menos, um caracter especial(@+#$), um caracter numérico, um caracter alfanumérico;" 
                    required="required" minlength="8" />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Senha é requerido</div>
                    }
                </div>
                <div className="form-group">
                    <label>Confirmar senha</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className={'form-control' + (submitted && !user.confirmPassword ? ' is-invalid' : '')} 
                    pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@+#$])[a-zA-Z0-9@+#$]{8,50}$" title="Password deve possuir ao menos 8 caracteres, contendo ao menos, um caracter especial(@+#$), um caracter numérico, um caracter alfanumérico;" 
                    required="required" minlength="8"/>
                    {submitted && !user.confirmPassword &&
                        <div className="invalid-feedback">Senha é requerido</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Registrar
                    </button>
                    <Link to="/login" className="btn btn-link">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };