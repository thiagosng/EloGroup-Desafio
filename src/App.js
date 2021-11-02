import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './redux/helpers';
import { alertActions } from './redux/actions';
import { PrivateRoute } from './Components/RedirectLogin';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';
import { PainelPage } from './Pages/PainelPage';
import { NewLeadPage } from './Pages/NewLeadPage';

const App = () => {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // alerta claro sobre mudança de local
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="col-md-8 offset-md-2">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            {/* <PrivateRoute exact path="/" component={HomePage} /> */}
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <PrivateRoute exact path="/" component={PainelPage} />
                            <PrivateRoute  path="/new-lead" component={NewLeadPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;