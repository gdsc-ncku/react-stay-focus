

export const localStorage = {
    /**
     *
     * @param key {string}
     * @returns {Promise}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, data => {
                if (data[key] !== undefined) {
                    resolve(data[key]);
                } else if (key === null){
                    resolve(data);
                } else {
                    reject("");
                }
            });
        });
    },
    /**
     *
     * @param key {string}
     * @param value {any}
     */
    set(key, value) {
        if (key === null) {
            chrome.storage.local.set(value);
        } else {
            chrome.storage.local.set({[key]: value});
        }
    }
}

/**
 *
 * @returns {Promise}
 */
export const getChromeActiveTab = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            resolve(tabs[0])
        });
    });
}

/**
 *
 * @param url {string}
 */
export const openChromeNewTab = url => {
    chrome.tabs.create({"url": url});
}
export const setExtensionIcon = iconPath => {
    chrome.browserAction.setIcon({"path": iconPath});
}

