import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { setApiKey, setLoggingEnabled, setTotalTimeLoggedToday } from '../reducers/configReducer';
import config from '../config/config';
import WakaTimeCore from '../core/WakaTimeCore';
import browser from 'webextension-polyfill';
import { setUser } from '../reducers/currentUser';
import changeExtensionState from './changeExtensionState';
import apiKeyInvalid from './apiKey';

export const logUserIn = async (apiKey: string): Promise<void> => {
  if (!apiKey) {
    await changeExtensionState('notSignedIn');
    return;
  }

  try {
    await WakaTimeCore.checkAuth(apiKey);
    const items = await browser.storage.sync.get({ loggingEnabled: config.loggingEnabled });

    if (items.loggingEnabled === true) {
      await changeExtensionState('allGood');
    } else {
      await changeExtensionState('notLogging');
    }
  } catch (err: unknown) {
    await changeExtensionState('notSignedIn');
  }
};

export const fetchUserData = async (
  apiKey: string,
): Promise<void> => {
  if (!apiKey) {
    const storage = await browser.storage.sync.get({
      apiKey: config.apiKey,
    });
    apiKey = storage.apiKey as string;
    if (!apiKey || apiKeyInvalid(apiKey) !== '') {
      apiKey = await WakaTimeCore.fetchApiKey();
      if (apiKey) {
        await browser.storage.sync.set({ apiKey });
      }
    }
  }

  if (!apiKey) {
    return changeExtensionState('notSignedIn');
  }
};
