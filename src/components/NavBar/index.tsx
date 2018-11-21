import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown } from 'reactstrap';
import compose from 'recompose/compose';
import defaultLanguage from '../../translations/en.welcome.json';

import './NavBar.css';

interface INavState {
  languageSelection: any;
  isOpen: boolean;
  direction: string;
}

class NavBar extends React.Component<INavProps, INavState>{
  public userMenu: any;

  constructor(props: INavProps) {
    super(props);
    this.state = {
      direction: 'rtl',
      isOpen: false,
      languageSelection: null
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

  public handleLangClose = (code: string) => {
    this.props.setActiveLanguage(code);
    this.setState({ languageSelection: null });
  }

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    const { activeLanguage, languages } = this.props;
    return (
      <div className="navbar-container">
        <Navbar expand="md" dark={true}>
          <NavbarBrand href="/">App Name</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink className="nav-link" exact={true} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" exact={true} to="/hello">Hello</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" exact={true} to="/counter">Counter</NavLink>
              </NavItem>
              <UncontrolledDropdown nav={true} inNavbar={true}>
                <DropdownToggle nav={true} caret={true}>
                  {activeLanguage ? activeLanguage.name : ''}
                </DropdownToggle>
                <DropdownMenu right={true}>
                  {languages.map((lang: any, index: number) => (
                    <DropdownItem>
                      <a className="dropdown-item" key={index} onClick={() => this.handleLangClose(lang.code)} href="#">{lang.name}</a>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
    </div>
    );
  }
}

interface INavProps extends LocalizeContextProps {
  classes: any
}

export default compose(
  withRouter,
  withLocalize
)(NavBar);
