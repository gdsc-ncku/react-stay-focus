import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordUnlock = ({ lockSettings, onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleUnlock = () => {
    if (password.toLowerCase() === lockSettings.password.toLowerCase()) {
      onUnlock();
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div>
      <div className="md-layout">
        <div className="md-layout-item">
          {lockSettings.password === '' ? (
            <div>
              <p>You haven't set a password yet! Go to settings to set it.</p>
              <button className="md-raised md-accent" onClick={onUnlock}>Go To setting</button>
            </div>
          ) : (
            <div>
              <label>Enter Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleUnlock();
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      {showErrorMessage && (
        <div className="md-snackbar" style={{ position: 'center', duration: 4000 }}>
          <span>Wrong Password!</span>
        </div>
      )}
    </div>
  );
};

PasswordUnlock.propTypes = {
  lockSettings: PropTypes.shape({
    password: PropTypes.string.isRequired,
  }).isRequired,
  onUnlock: PropTypes.func.isRequired,
};

export default PasswordUnlock;
