import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from '../../../components/elements/Switch';

const propTypes = {
  state: PropTypes.bool,
  handlePricingSwitch: PropTypes.func,
  labels: PropTypes.shape({
    type: PropTypes.string,
    default: PropTypes.string,
    switchOn: PropTypes.string
  }).isRequired
}

class PricingSwitcher extends React.Component {

  render() {

    const {
      className,
      state,
      handlePricingSwitch,
      labels,
      ...props
    } = this.props;

    const classes = classNames(
      'pricing-switcher center-content',
      className
    );

    return (
      <div
        {...props}
        className={classes}
      >
        <div className="pricing-switcher-inner">
          <span className="pricing-switcher-label fw-500">{labels.default}</span>
          <Switch
            checked={this.props.state}
            onChange={this.props.handlePricingSwitch}
            labelHidden
          >{labels.type}</Switch>
          <span className="pricing-switcher-label fw-500">{labels.switchOn}</span>
        </div>
      </div>
    );
  }
}

PricingSwitcher.propTypes = propTypes;

export default PricingSwitcher;