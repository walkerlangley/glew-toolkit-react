import React from 'react';
import PropTypes from 'prop-types';
import './banner.css';

/**
 * Primary UI component for user interaction
 */
export const Banner = ({ primary, bgColorContainer, size, textHeader, textBody, ...props }) => {
  // const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <div
      className='bannerContainer'
      style={bgColorContainer && { backgroundColor: bgColorContainer }}
      >
      <div className='topBarStyles'></div>
      <div>
        <div className='textContainer'>
          <div className='textHeaderStyles'>{ textHeader }</div>
          <div className='textBodyStyles'>{ textBody }</div>
          <div>
            <div>
            <span
              className='buttonTextStyle'></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  bgColorContainer: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Banner contents
   */
  textHeader: PropTypes.string,
  textBody: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Banner.defaultProps = {
  bgColorContainer: '#f0f9f9',
  primary: false,
  size: 'medium',
  onClick: undefined,
};
