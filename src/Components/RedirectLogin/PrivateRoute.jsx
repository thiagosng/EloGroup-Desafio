import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // não logado, então redirecione para a página de login com o url de retorno
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logado para retornar o componente
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };