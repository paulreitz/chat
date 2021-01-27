import { render } from '@testing-library/react';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    render: Render,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated
        ? (props.component? (<Component {...props} />) : (<Render {...props} />))
        : (<Redirect to="/" />)
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token
});

export default connect(mapStateToProps)(PrivateRoute);