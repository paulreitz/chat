import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    render: Render,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated
        ? (<Redirect to="/profile" />)
        : (props.component? (<Component {...props} />) : (<Render {...props} />))
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token
});

export default connect(mapStateToProps)(PublicRoute);