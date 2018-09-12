import deepPurple from '@material-ui/core/colors/deepPurple';
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

declare module '@material-ui/core/styles/createMuiTheme' {
  // tslint:disable-next-line:interface-name
  interface Theme {
    colors: {
      primaryText: string
    },
    transparentBackground: {
      dark: string
      light: string
    }
  }
  // allow configuration using `createMuiTheme`
  // tslint:disable-next-line:interface-name
  interface ThemeOptions {
    colors?: {
      primaryText?: string
    },
    transparentBackground?: {
      dark?: string
      light?: string
    }
  }
}

const theme = createMuiTheme({
  colors:{
    primaryText: '#fff'
  },
  palette: {
    primary: {
      contrastText: '#fff',
      main: deepPurple[900]
    }
  },
  transparentBackground: {
    dark: 'rgba(0, 0, 0, 0.15)',
    light: 'rgba(255, 255, 255, 0.15)'
  },
});

function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;