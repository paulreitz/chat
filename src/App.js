import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';

import store from './store/configureStore';
import theme from './theme/theme';
import Header from './components/Header';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Chat from './components/Chat';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/chat" component={Chat} />
            <Route path="*" render={(props) => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
