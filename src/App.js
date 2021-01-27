import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';

import store from './store/configureStore';
import theme from './theme/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>App with theme</div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
