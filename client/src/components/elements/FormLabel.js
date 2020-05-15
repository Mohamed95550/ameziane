import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  labelHidden: PropTypes.bool
}

const defaultProps = {
  children: null,
  labelHidden: false
}

const FormLabel = ({
  className,
  children,
  labelHidden,
  ...props
}) => {

  const classes = classNames(
    'form-label',
    labelHidden && 'screen-reader',
    className
  );

  return (
    <label
      {...props}
      className={classes}
    >
      {children}
    </label>
  );
}

FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;