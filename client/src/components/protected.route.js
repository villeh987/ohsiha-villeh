import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import './data.css';

export const ProtectedRoute = ({component: Component, auth, ...rest}) => {
    const isAuth = sessionStorage.getItem('auth');

    return(
        <Route {...rest} render={props => {
            if (isAuth) {
               return <Component {...rest} {...props}/>             
           } else {
            return <Redirect to={
            {
                pathname: "/login",
                state: {
                    from: props.location
                }
            }

            }/>
           }
        }}
        />
    )
}
