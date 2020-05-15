import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from './partials/Logo';
import { FaEllipsisH } from 'react-icons/fa';



const propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  active: false,
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomDivider: false
}

class Header extends React.Component {

  state = {
    isActive: false
  };

  nav = React.createRef();
  hamburger = React.createRef();

  componentDidMount() {
    this.props.active && this.openMenu();
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
    this.closeMenu();
  }

  openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    this.nav.current.style.maxHeight = this.nav.current.scrollHeight + 'px';
    this.setState({ isActive: true });
  }

  closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    this.nav.current && (this.nav.current.style.maxHeight = null);
    this.setState({ isActive: false });
  }

  keyPress = (e) => {
    this.state.isActive && e.keyCode === 27 && this.closeMenu();
  }

  clickOutside = (e) => {
    if (!this.nav.current) return
    if (!this.state.isActive || this.nav.current.contains(e.target) || e.target === this.hamburger.current) return;
    this.closeMenu();
  }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
              return [
                <ul className={
                  classNames(
                    'list-reset text-xxs'         
                  )}>
                
                </ul>,
                <ul className={
                  classNames(
                    'list-reset text-xxs'
                  )}>
                 
                </ul>,
                 <ul className={
                  classNames(
                    'list-reset text-xxs'        
                  )}>
                     <li>
                    <a href="/signup" onClick={this.closeMenu}>Singn up</a>
                  </li>
                  <li>
                    <a href="/login" onClick={this.closeMenu}>Login</a>
                  </li>
                  <li>
                    <a href="/auth/discord" onClick={this.closeMenu}>Login Discord</a> 
                  </li>
                </ul>
            ];
            default:
              return [
              
                <ul className={
                  classNames(
                    'list-reset text-xxs'
                   
                  )}>
                
                </ul>,
                <ul className={
                  classNames(
                    'list-reset text-xxs'
                  )}>
                 
                </ul>,
                 <ul className={
                  classNames(
                    'list-reset text-xxs'
                  )}>
                 
                </ul>,
                 <ul className={
                  classNames(
                    'list-reset text-xxs'
                  )}>
                      <li>
                    <a href="/dashboard" onClick={this.closeMenu}>Dashboard</a>
                  </li>
                   <li>
                    <a href="/tasks" onClick={this.closeMenu}>Tasks</a>
                  </li>
                  <li>
                    <a href="/" onClick={this.closeMenu}>Setting</a>
                  </li>
                  <li>
                    <a href="/api/logout" onClick={this.closeMenu}>logout</a>
                  </li>
                </ul>
            ];
        }
    }
    render() {
      const {
        className,
        active,
        navPosition,
        hideNav,
        hideSignin,
        bottomDivider,
        auth,
        ...props
      } = this.props;
  
      const classes = classNames(
        'site-header',
        className
      );
  
      return (
        <header
          {...props}
          className={classes}
        >
          <div className="container">
            <div className={
              classNames(
                'site-header-inner',
                bottomDivider && 'has-bottom-divider'
              )}>
              <Logo /><a id="logo" href={this.props.auth? '/dashboard':'/'}>RAFFLES PLATFORM</a>
              {!hideNav &&
                <React.Fragment>
                  <button
                    ref={this.hamburger}
                    className="header-nav-toggle"
                    onClick={this.state.isActive ? this.closeMenu : this.openMenu}
                  >
                    <span className="screen-reader">Menu</span>
                    <span className="hamburger">
                      <span className="hamburger-inner"></span>
                    </span>
                  </button>
                  <nav
                    ref={this.nav}
                    className={
                      classNames(
                        'header-nav',
                        this.state.isActive && 'is-active'
                      )}>     
                    <div className="header-nav-inner">
  
                     {this.renderContent()}
  
                    </div>
                  </nav>
                </React.Fragment>}
            </div>
          </div>
        </header>
      )
    }
  }
  
  Header.propTypes = propTypes;
  Header.defaultProps = defaultProps;
  function mapStateToProps({ auth }) {
    return { auth };
  }
  export default connect(mapStateToProps)(Header) ;