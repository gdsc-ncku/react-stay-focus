import React, { useState } from 'react';

const ClickButtonUnlock = ({ lockSettings, onUnlock }) => {
    const [clicksLeft, setClicksLeft] = useState(lockSettings.clickButtonCounts);
    const [buttonPositionStyle, setButtonPositionStyle] = useState({
        textAlign: "center",
    });

    const handleClick = () => {
        setClicksLeft(prevClicks => prevClicks - 1);
        updateButtonPosition();
        if (clicksLeft <= 0) {
            onUnlock();
        }
    };

    const updateButtonPosition = () => {
        const availablePositions = ['center', 'left', 'right'];
        setButtonPositionStyle({
            textAlign: availablePositions[Math.floor(Math.random() * availablePositions.length)]
        });
    };

    return (
        <div>
            <div className="md-layout">
                <div style={buttonPositionStyle} className="md-layout-item">
                    <button
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                            }
                        }}
                        onClick={handleClick}
                        className="md-raised md-accent"
                    >
                        {clicksLeft} clicks to unlock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClickButtonUnlock;
