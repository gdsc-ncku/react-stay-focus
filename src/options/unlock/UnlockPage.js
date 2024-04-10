import React, { useState, useEffect } from 'react';
import { getSettings } from '../../chromeApiHelpers';
import QuestionUnlock from './QuestionUnlock';
import PasswordUnlock from './PasswordUnlock';
import CardWithLogo from '../../sharedComponents/CardWithLogo';
import ClickButtonUnlock from './ClickButtonUnlock';

const UnlockPage = () => {
  const [lockSettings, setLockSettings] = useState({});

  // useEffect(() => {
  //   getSettings('settings').then(settings => {
  //     setLockSettings(settings.lock);
  //   });
  // }, []);

  // const handleUnlock = () => {
  //   setItem('active', false);
  //   // Assuming there's a prop or state to handle unlocking in the parent component
  //   // You may need to adjust this part based on your application structure
  //   // e.g., this.props.onUnlock() or setUnlock(true)
  // };

  const lockComponentName = lockSettings.type ? `${lockSettings.type}-unlock` : '';

  return (
    <CardWithLogo>
      {lockComponentName && (
        <Component
          lockSettings={lockSettings}
          handleUnlock={handleUnlock}
          is={lockComponentName === 'question' ? QuestionUnlock :
              lockComponentName === 'password' ? PasswordUnlock : 
              lockComponentName === 'click-button' ? ClickButtonUnlock : null}
        />
      )}
    </CardWithLogo>
  );
};

export default UnlockPage;
