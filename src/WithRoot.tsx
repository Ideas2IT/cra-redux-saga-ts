
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider  } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from './reducers';
import { themes } from './themes/index';

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

interface IRootProps {
  activeTheme: any,
  children: any
}

/**
 * HOC that wraps up theme provider with main AP
 */
const WithRoot = ({ children, activeTheme }: IRootProps) => (
  // MuiThemeProvider makes the theme available down the React tree, thanks to React context.
  <MuiThemeProvider theme={createMuiTheme(themes[activeTheme])}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);


const mapStateToProps = (state: IState) => ({
  activeTheme: state.theme.activeTheme
});

export default connect(mapStateToProps)(WithRoot);
