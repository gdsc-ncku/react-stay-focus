import browser from 'webextension-polyfill';
import config from '../config/config';
import { localStorage } from '../chromeApiHelpers'

export default function apiKeyInvalid(key?: string): string {
  // check key is uuid
  if (!key || key.length !== 36) {
    return 'Invalid API';
  }
  return '';
}


export async function getApiKey(): Promise<string> {
  const storage = await browser.storage.sync.get({
    apiKey: config.apiKey,
  });
  const apiKey = storage.apiKey as string;
  return apiKey;
}

//changed
// export async function getApiKey(): Promise<string> {
//   const apiKey = await localStorage.get('apiKey')
//   console.log('apiKey for dev', apiKey)
//   return apiKey;
// }