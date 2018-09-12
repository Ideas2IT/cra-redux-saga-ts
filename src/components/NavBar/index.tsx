import {
  AppBar, Button, Divider,
  Drawer, Hidden, IconButton, List,
  ListItem, ListItemText, Menu, MenuItem,
  Theme, Toolbar, Typography, withStyles
} from '@material-ui/core';
import { AccountCircle, FiberManualRecord, Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import compose from 'recompose/compose';
import { changeTheme } from '../../actions/theme/theme';
import { IState } from '../../reducers';
import { themes } from '../../themes/index';
import defaultLanguage from '../../translations/en.welcome.json';
import { styles } from './style';

interface INavState {
  languageSelection: any,
  themeSelection: any,
  availableThemes: Theme[],
  openSideNav: boolean,
  direction: string
}

class NavBar extends React.Component<INavProps, INavState>{
  constructor(props: INavProps) {
    super(props);
    this.state = {
      availableThemes: Object.keys(themes).map(key => {
        themes[key].code = key;
        return themes[key];
      }),
      direction: 'rtl',
      languageSelection: null,
      openSideNav: false,
      themeSelection: null
    };
    this.props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'French', code: 'fr' },
        { name: 'Spanish', code: 'es' }
      ],
      options: { renderToStaticMarkup },
      translation: defaultLanguage
    });
    this.addTranslationsForActiveLanguage();
  }

  public componentDidUpdate(prevProps: INavProps) {
    const hasActiveLanguageChanged =
      prevProps.activeLanguage !== this.props.activeLanguage;
    if (hasActiveLanguageChanged) {
      this.addTranslationsForActiveLanguage();
    }
  }

  public addTranslationsForActiveLanguage() {
    const { activeLanguage } = this.props;
    if (!activeLanguage) {
      return;
    }
    import(`../../translations/${activeLanguage.code}.welcome.json`).then(
      translations => {
        this.props.addTranslationForLanguage(translations, activeLanguage.code);
      }
    );
  }

  public handleDrawerToggle = () => {
    this.setState(state => ({ openSideNav: !state.openSideNav }));
  }

  public handleLangClick = (event: any) => {
    this.setState({ languageSelection: event.currentTarget });
  }

  public handleLangClose = (code: string) => {
    this.props.setActiveLanguage(code);
    this.handleDrawerToggle();
    this.setState({ languageSelection: null });
  }

  public handleThemeClick = (event: any) => {
    this.setState({ themeSelection: event.currentTarget });
  }

  public handleThemeClose = (theme: string) => {
    this.handleDrawerToggle();
    this.props.setActiveTheme(theme);
    this.setState({ themeSelection: null });
  }

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
          onClose={() => this.handleLangClose(activeLanguage ? activeLanguage.code : '')}>
          {languages.map((lang, index) => (
            <MenuItem key={index} onClick={() => this.handleLangClose(lang.code)}>{lang.name}</MenuItem>
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
          onClose={() => this.handleThemeClose(activeTheme)}>
          {availableThemes.map((theme: any, index) => (
            <MenuItem className={classes.themes} key={index} onClick={() => this.handleThemeClose(theme.code)}>
              <FiberManualRecord className={classes.themeIcon} style={{color: theme.palette.primary.main}}/>
              {theme.code}
            </MenuItem>
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
            onClose={() => this.handleLangClose(activeLanguage ? activeLanguage.code : '')}>
            {languages.map((lang, index) => (
              <MenuItem key={index} onClick={() => this.handleLangClose(lang.code)}>{lang.name}</MenuItem>
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
            onClose={() => this.handleThemeClose(activeTheme)}>
            {availableThemes.map((theme: any, index) => (
              <MenuItem className={classes.themes} key={index} onClick={() => this.handleThemeClose(theme.code)}>
                <FiberManualRecord className={classes.themeIcon} style={{color: theme.palette.primary.main}} />
                {theme.code}
              </MenuItem>
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
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            {sideNavLinks}
          </Drawer>
        </Hidden>
      </div>
    );
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
  activeTheme: state.theme.activeTheme
});

const mapDispatchToProps = (dispatch: any) => ({
  setActiveTheme: (theme: string) => dispatch(changeTheme(theme))
});

export default compose(
  withStyles(styles),
  withRouter,
  connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps),
  withLocalize
)(NavBar);
