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

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <PublicRoute exact path="/" component={Landing} />
            <PrivateRoute exact path="/profile" render={(props) => <div>Profile</div>} />
            <PrivateRoute exact path="/chat" render={(props) => <div>Chat</div>} />
            <Route path="*" render={(props) => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
