import browser from 'webextension-polyfill';
import config from '../config/config';

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