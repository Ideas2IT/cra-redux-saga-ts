import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const styles = ({colors, transparentBackground}: Theme) => 
  createStyles({
    dropdownBtn: {
      color: colors.primaryText,
      textTransform: 'capitalize'
    },
    flex: {
      flexGrow: 1,
    },
    linkBtn: {
      '&.active': {
        backgroundColor: transparentBackground.dark
      },
      '&:hover': {
        backgroundColor: transparentBackground.dark
      },
      borderRadius: '3px',
      color: colors.primaryText,
      margin: '0 3px',
      padding: '5px 10px',
      textDecoration: 'none',
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px'
    },
});

interface IApp {
  classes: any
}

class NavBar extends React.Component<IApp, {}>{
  public state = {
    languageSelection: null,
  };

  public handleClick = (event: any) => {
    this.setState({ languageSelection: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ languageSelection: null });
  };

  public render() {
    const { classes } = this.props;
    const { languageSelection } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              App Name
            </Typography>
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
            <div>
              <Button
                className={classes.dropdownBtn}
                aria-owns={languageSelection ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                Select Language
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={languageSelection}
                open={Boolean(languageSelection)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>English</MenuItem>
                <MenuItem onClick={this.handleClose}>Spanish</MenuItem>
                <MenuItem onClick={this.handleClose}>French</MenuItem>
              </Menu>
            </div>
            <IconButton
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar);
 