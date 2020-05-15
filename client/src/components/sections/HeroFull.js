import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class HeroFull extends React.Component {

  state = {
    videoModalActive: false
  }
  openModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: true });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: false });
  }

  render() {
    const {
      className,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'hero section center-content',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'hero-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (
      
      <section
        {...props}
        className={outerClasses}
      >
         {this.props.auth? '':Redirect('/login')}
        <div className="container">
          <div className={innerClasses}>
            <div className="hero-content">
              <div className="container-xs">
                <h1 className="mt-0 reveal-from-left">
                    DASHBOARD
                </h1>
              </div>
            </div>
            <div className="hero-figure illustration-element-02 reveal-scale-up">
              <a
                data-video="https://player.vimeo.com/video/174002812"
                href="#0"
                aria-controls="video-modal"
                onClick={this.openModal}
              >
                <Image
                  className="has-shadow"
                  src={require('./../../assets/images/video-placeholder.svg')}
                  alt="Video"
                  width={712}
                  height={400} />
              </a>
            </div>
            <Modal
              id="video-modal"
              show={this.state.videoModalActive}
              handleClose={this.closeModal}
              video="https://player.vimeo.com/video/174002812"
              videoTag="iframe" /> 
          </div>
        </div>
      </section>
    );
  }
}

HeroFull.propTypes = propTypes;
HeroFull.defaultProps = defaultProps;

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(HeroFull);