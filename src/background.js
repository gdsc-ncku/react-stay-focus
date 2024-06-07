import {
    getFlatEnabledListOfWebsites,
    isCurrentTimeBetweenTwoTimes,
    isTodayOneOfTheseDays,
    isValidURL, regexMatch,
    resetChromeStorageData as setDefaultStorageData,
    setIcon
} from "./helpers";

global.browser = require('webextension-polyfill');
import {localStorage} from "./chromeApiHelpers";
// import {handle103To104Upgrade} from "./Migration/upgrades";
import {skippedUrls} from "./constants";

import browser from 'webextension-polyfill';
import WakaTimeCore from './core/WakaTimeCore';
import { PostHeartbeatMessage } from './types/heartbeats';

const chooseIconColor = () => {
    localStorage.get("active").then(active => {
        setIcon(active);
    });
}
const checkIfMatch = (blockItem, url) => {
    if (skippedUrls.some(skippedUrl => url.includes(skippedUrl))) {
        return false;
    }
    switch (blockItem.blockType) {
        case "regex":
            return regexMatch(url, blockItem.url);
        default:
            return url.includes(blockItem.url)
    }
}
const checkIfCanEnterWebsite = info => {
    if (info.frameId === 0 && isValidURL(info.url)) {
        localStorage.get("active").then(isActive => {
            if (isActive) {
                localStorage.get("settings").then(settings => {
                    if (settings.workHours && settings.workHours.enableWorkHours === true) {
                        isActive = isActive && isTodayOneOfTheseDays(settings.workHours.days) && isCurrentTimeBetweenTwoTimes(settings.workHours.startTime, settings.workHours.endTime);
                    }
                    if (isActive) {
                        localStorage.get("sitesGroups").then(sitesGroups => {
                            let blockedWebsites = getFlatEnabledListOfWebsites(sitesGroups);
                            let mustGoBack = blockedWebsites.some(website => checkIfMatch(website, info.url));
                            if (mustGoBack) {
                                chrome.tabs.update(info.tabId, {"url": "goback/goback.html"});
                            }
                        })
                    }
                })
            }
        })
    }
};

const getUsage = (siteUrl) => {
  let min = 1;
  let max = 1000;
  let randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}

const updateUsages = () => {
  localStorage.get("sitesGroups").then(sitesGroups => {
    console.log(sitesGroups);
    for (let sitesGroup of sitesGroups) {
      if (sitesGroup.sitesList.length === 0){
        continue;
      }
      for (let list of sitesGroup.sitesList) {
        let usage = getUsage(list.url);
        localStorage.set(list.url, usage);
      }
   }
  });
}

chrome.webNavigation.onCommitted.addListener(checkIfCanEnterWebsite);
chrome.webNavigation.onCommitted.addListener(chooseIconColor);


//handle installation of extension
chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version
    const previousVersion = details.previousVersion;
    localStorage.set('version', currentVersion);
    const reason = details.reason;
    console.log("reason", reason);
    switch (reason) {
        case 'install':
            console.log("installed Successfully");
            break;
        case 'update':
            setDefaultStorageData();
            console.log(`prev version: ${previousVersion}, current version: ${currentVersion}`);
            // handle103To104Upgrade(previousVersion, currentVersion);
            console.log("Updated Successfully");
            break;
    }
})

// Add a listener to resolve alarms
browser.alarms.onAlarm.addListener(async (alarm) => {
  // |alarm| can be undefined because onAlarm also gets called from
  // window.setTimeout on old chrome versions.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (alarm && alarm.name == 'heartbeatAlarm') {
    // Checks if the user is online and if there are cached heartbeats requests,
    // if so then procedd to send these payload to wakatime api
    if (navigator.onLine) {
      await WakaTimeCore.sendCachedHeartbeatsRequest();
    }
  }
});

// Create a new alarm for sending cached heartbeats.
browser.alarms.create('heartbeatAlarm', { periodInMinutes: 2 });

/**
 * Whenever a active tab is changed it records a heartbeat with that tab url.
 */
browser.tabs.onActivated.addListener(async () => {
  console.log('recording a heartbeat - active tab changed');
  await WakaTimeCore.recordHeartbeat();
  console.log('recored');
});

/**
 * Whenever a active window is changed it records a heartbeat with the active tab url.
 */
browser.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId != browser.windows.WINDOW_ID_NONE) {
    console.log('recording a heartbeat - active window changed');
    await WakaTimeCore.recordHeartbeat();
  }
});

/**
 * Whenever any tab is updated it checks if the updated tab is the tab that is
 * currently active and if it is, then it records a heartbeat.
 */
browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    // Get current tab URL.
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    // If tab updated is the same as active tab
    if (tabId == tabs[0]?.id) {
      await WakaTimeCore.recordHeartbeat();
    }
  }
});

/**
 * Creates IndexedDB
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
self.addEventListener('activate', async () => {
  await WakaTimeCore.createDB();
});

browser.runtime.onMessage.addListener(async (request) => {
  if (request.recordHeartbeat === true) {
    await WakaTimeCore.recordHeartbeat(request.projectDetails);
  }
});

const keepAlive = () => {
    setInterval(() => {
      chrome.runtime.getPlatformInfo((platformInfo) => {
        console.log(platformInfo);
        console.log("keep alive");
      });
      updateUsages();

      localStorage.get(null).then(data => {
        console.log(data);
      });
    }, 2000);
  };
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();