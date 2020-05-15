import PropTypes from 'prop-types';

// Props shared by all sections
const SectionShared = {
  types: {
    topDivider: PropTypes.bool,
    bottomDivider: PropTypes.bool,
    hasBgColor: PropTypes.bool,
    invertColor: PropTypes.bool
  },
  defaults: {
    topDivider: false,
    bottomDivider: false,
    hasBgColor: false,
    invertColor: false
  }
}

// Default section props
export const SectionProps = {
  types: {
    ...SectionShared.types
  },
  defaults: {
    ...SectionShared.defaults
  }
}

// Section split props
export const SectionSplitProps = {
  types: {
    ...SectionShared.types,
    invertMobile: PropTypes.bool,
    invertDesktop: PropTypes.bool,
    imageFill: PropTypes.bool
  },
  defaults: {
    ...SectionShared.defaults,
    invertMobile: false,
    invertDesktop: false,
    imageFill: false
  }
}

// Section tiles props
export const SectionTilesProps = {
  types: {
    ...SectionShared.types,
    pushLeft: PropTypes.bool
  },
  defaults: {
    ...SectionShared.defaults,
    pushLeft: false
  }
}