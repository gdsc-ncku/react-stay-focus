import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ delay = 100, direction = 'right', iconText = '?' }) => {
    return (
        <span>
            <span className="tooltip-icon">{iconText}</span>
            <div className={`tooltip tooltip-${direction}`} data-delay={delay}>
                {/* The text to be displayed when hovering */}
                {children}
            </div>
        </span>
    );
};

Tooltip.propTypes = {
    delay: PropTypes.number,
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    iconText: PropTypes.string,
};

export default Tooltip;
