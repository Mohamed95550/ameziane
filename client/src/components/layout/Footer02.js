import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from './partials/Logo';
import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';

const propTypes = {
  topDivider: PropTypes.bool
}

const defaultProps = {
  topDivider: false
}

class Footer extends React.Component {

  render() {
    const {
      className,
      topDivider,
      ...props
    } = this.props;

    const classes = classNames(
      'site-footer',
      className
    );

    return (
      <footer
        {...props}
        className={classes}
      >
        <div className="container">
          <div className={
            classNames(
              'site-footer-inner',
              topDivider && 'has-top-divider'
            )}>
            <div className="footer-top text-xxs">
              <div className="footer-blocks">
                <div className="footer-block reveal-from-bottom" data-reveal-offset="0">
                  <Logo className="mb-16" />
                  <div className="footer-copyright">&copy; 2019 Twist, all rights reserved</div>
                </div>
                <div className="footer-block reveal-from-bottom" data-reveal-offset="0" data-reveal-delay="100">
                  <div className="footer-block-title">Company</div>
                  <ul className="list-reset">
                    <li>
                      <a href="https://cruip.com/">Dummy text used</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">The purpose of lorem</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Filler text can be very useful</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Be on design</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-block reveal-from-bottom" data-reveal-offset="0" data-reveal-delay="200">
                  <div className="footer-block-title">Uses cases</div>
                  <ul className="list-reset">
                    <li>
                      <a href="https://cruip.com/">Consectetur adipiscing</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Lorem Ipsum is place</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Excepteur sint</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Occaecat cupidatat</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-block reveal-from-bottom" data-reveal-offset="0" data-reveal-delay="300">
                  <div className="footer-block-title">Docs</div>
                  <ul className="list-reset mb-0">
                    <li>
                      <a href="https://cruip.com/">The purpose of lorem</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Dummy text used</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Excepteur sint</a>
                    </li>
                    <li>
                      <a href="https://cruip.com/">Occaecat cupidatat</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-bottom space-between center-content-mobile text-xxs reveal-from-bottom" data-reveal-offset="0">
              <FooterNav />
              <FooterSocial />
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;