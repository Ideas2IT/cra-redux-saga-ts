import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';
import compose from 'recompose/compose';
import { changeTheme } from '../actions/theme/theme';
import { IState } from '../reducers';
import { themes } from '../themes/index';
import globalTranslations from '../translations/global.json';

const drawerWidth = 240;

const styles = ({ breakpoints, colors, transparentBackground, palette, mixins }: Theme) =>
createStyles({
  drawerPaper: {
    width: drawerWidth,
    [breakpoints.up('md')]: {
      position: 'relative',
    }
  },
  dropdownBtn: {
    [breakpoints.down('md')]: {
      color: palette.primary.light
    },
    '&:hover': {
      backgroundColor: transparentBackground.light
    },
    color: colors.primaryText,
    textTransform: 'capitalize'
  },
  flex: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  linkBtn: {
    [breakpoints.down('md')]: {
    color: palette.primary.light
  },
  '&.active': {
    backgroundColor: transparentBackground.dark
  },
  '&:hover': {
    backgroundColor: transparentBackground.light
  },
  borderRadius: '3px',
  color: colors.primaryText,
  margin: '0 3px',
  padding: '5px 10px',
  textDecoration: 'none',
  },
  navIconHide: {
    [breakpoints.up('md')]: {
    display: 'none',
  },
  flex: 0,
    marginLeft: 'auto',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  },
    toolbar: mixins.toolbar,
});

interface INavState {
  languageSelection: any,
  themeSelection: any,
  availableThemes: string[],
  openSideNav: boolean,
  direction: string
}

class NavBar extends React.Component<INavProps, INavState>{
  constructor(props: INavProps) {
    super(props);
    this.state = {
      availableThemes: (() => Object.keys(themes))(),
      direction: 'rtl',
      languageSelection: null,
      openSideNav: false,
      themeSelection: null,
    }
    this.props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
        { name: 'Spanish', code: 'es' }
      ],
      options: { renderToStaticMarkup },
      translation: globalTranslations
    });
  }

  public handleDrawerToggle = () => {
    this.setState(state => ({ openSideNav: !state.openSideNav }));
  };

  public handleLangClick = (event: any) => {
    this.setState({ languageSelection: event.currentTarget });
  };

  public handleLangClose = (code: string) => {
    this.props.setActiveLanguage(code);
    this.handleDrawerToggle();
    this.setState({ languageSelection: null });
  };

  public handleThemeClick = (event: any) => {
    this.setState({ themeSelection: event.currentTarget });
  };

  public handleThemeClose = (theme: string) => {
    this.handleDrawerToggle();
    this.props.setActiveTheme(theme);
    this.setState({ themeSelection: null });
  };

  public render() {
    const { activeLanguage, activeTheme, classes, languages } = this.props;
    const { availableThemes, languageSelection, themeSelection } = this.state;
    const navLinks = (
      <div className={classes.flex}>
        <NavLink
          exact={true}
          to="/"
          activeClassName="active"
          className={classes.linkBtn}>
          Home
        </NavLink>
        <NavLink
          exact={true}
          to="/hello"
          activeClassName="active"
          className={classes.linkBtn}>
          Hello
        </NavLink>
        <NavLink
          exact={true}
          to="/counter"
          activeClassName="active"
          className={classes.linkBtn}>
          Counter
        </NavLink>
        <Button
          className={classes.dropdownBtn}
          aria-owns={languageSelection ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleLangClick}>
          {activeLanguage ? activeLanguage.name : ''}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={languageSelection}
          open={Boolean(languageSelection)}
          onClose={this.handleLangClose.bind(this, activeLanguage ? activeLanguage.code : '')}>
          {languages.map((lang, index) => (
            <MenuItem key={index} onClick={this.handleLangClose.bind(this, lang.code)}>{lang.name}</MenuItem>
          ))}
        </Menu>
        <Button
          className={classes.dropdownBtn}
          aria-owns={themeSelection ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleThemeClick}>
          {activeTheme}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={themeSelection}
          open={Boolean(themeSelection)}
          onClose={this.handleThemeClose.bind(this, activeTheme)}>
          {availableThemes.map((theme, index) => (
            <MenuItem key={index} onClick={this.handleThemeClose.bind(this, theme)}>{theme}</MenuItem>
          ))}
        </Menu>
        <IconButton
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
      </div>
    );

    const sideNavLinks = (
      <div className={classes.toolbar}>
        <List onClick={this.handleDrawerToggle}>
          <ListItem button={true}>
            <ListItemText primary="Main Menu" />
          </ListItem>
          <Divider />
          <ListItem>
            <NavLink
              exact={true}
              to="/"
              activeClassName="active"
              className={classes.linkBtn}>
              Home
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              exact={true}
              to="/hello"
              activeClassName="active"
              className={classes.linkBtn}>
              Hello
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink
              exact={true}
              to="/counter"
              activeClassName="active"
              className={classes.linkBtn}>
              Counter
            </NavLink>
          </ListItem>
        </List>
        <ListItem >
          <Button
            className={classes.dropdownBtn}
            aria-owns={languageSelection ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleLangClick}>
            {activeLanguage ? activeLanguage.name : ''}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={languageSelection}
            open={Boolean(languageSelection)}
            onClose={this.handleLangClose.bind(this, activeLanguage ? activeLanguage.code : '')}>
            {languages.map((lang, index) => (
              <MenuItem key={index} onClick={this.handleLangClose.bind(this, lang.code)}>{lang.name}</MenuItem>
            ))}
          </Menu>
        </ListItem>
        <ListItem>
          <Button
            className={classes.dropdownBtn}
            aria-owns={themeSelection ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleThemeClick}>
            {activeTheme}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={themeSelection}
            open={Boolean(themeSelection)}
            onClose={this.handleThemeClose.bind(this, activeTheme)}>
            {availableThemes.map((theme, index) => (
              <MenuItem key={index} onClick={this.handleThemeClose.bind(this, theme)}>{theme}</MenuItem>
            ))}
          </Menu>
        </ListItem>
        <ListItem>
          <IconButton
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
        </ListItem>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit">
              App Name
            </Typography>
            <Hidden smDown={true} className={classes.flex}>
              {navLinks}
            </Hidden>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Hidden mdUp={true}>
          <Drawer
            anchor={this.state.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.openSideNav}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {sideNavLinks}
          </Drawer>
        </Hidden>
      </div>
    )
  }
}

interface INavProps extends LocalizeContextProps {
  classes: any,
  activeTheme: string,
  setActiveTheme(theme: string): void
}

interface IStateProps {
  activeTheme: string
}

interface IDispatchProps {
  setActiveTheme(theme: string): void
}

const mapStateToProps = (state: IState) => ({
  activeTheme: state.theme.activeTheme,
})

const mapDispatchToProps = (dispatch: any) => ({
  setActiveTheme: (theme: string) => dispatch(changeTheme(theme))
})

export default compose(
  withStyles(styles),
  withRouter,
  connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps),
  withLocalize
)(NavBar);
