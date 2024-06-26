import {getSiteGroupStructure, getSiteStructure} from "./dataHelpers/SitesGroup";
export let settingsDefault = {
    workHours: {
        startTime: "08:00 AM",
        endTime: "05:00 PM",
        days: ["1", "2", "3", "4", "5"], // Monday to Thursday
        enableWorkHours: false
    },
    allowFunnyGoBackImages: true,
    lock: {
        type: "click-button", /*types are: question,click-button, password, none*/
        password: "123",
        questionNumberOfTries: 3,
        clickButtonCounts: 3, // how many times the user has to click the button to unlock
    }
};

export let websitesListDefault = [
    getSiteGroupStructure("Social Media", true, [
        getSiteStructure("facebook.com"),
        getSiteStructure("twitter.com"),
        getSiteStructure("instagram.com"),
        getSiteStructure("linkedin.com"),
    ]),
    getSiteGroupStructure("Videos Websites", false, [
        getSiteStructure("youtube.com"),
        getSiteStructure("netflix.com"),
        getSiteStructure("dailymotion.com"),
    ]),
    getSiteGroupStructure("Blocked By Word", true, [], 'word'),
    getSiteGroupStructure("Blocked By Regex", true, [], 'regex'),


];

export let activeDefault = false
