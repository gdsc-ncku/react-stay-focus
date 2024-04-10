import React from 'react';
import { truncateText } from "../helpers";
import AddBlockItemToList from "./BlockItemTabs/AddBlockItemToList";
// import Tooltip from "../sharedComponents/Tooltip";
import { blockTypes } from "../constants";

const SitesGroup = ({ sitesGroup, allowDelete, storeWebsites, addNewWebsite, deleteSite, deleteSitesGroup }) => {
    const truncateSiteUrl = (siteUrl) => {
        return truncateText(siteUrl, 15);
    };

    return (
        <div className={`site-group ${sitesGroup.groupEnabled ? '' : 'disabled'}`}>
            <div className="md-card">
                <div className="card-header">
                    <div className="md-title">{sitesGroup.groupName}</div>
                    <input
                        type="checkbox"
                        className="enable-group-switch"
                        checked={sitesGroup.groupEnabled}
                        onChange={() => storeWebsites()}
                    />
                </div>
                <div className="md-card-content">
                    <AddBlockItemToList
                        blockType={sitesGroup.blockType}
                        onAddNewWebsite={(data) => addNewWebsite(data)}
                    />
                    <ul className="md-list md-dense">
                        {sitesGroup.sitesList.map((site, siteIndex) => (
                            <li key={siteIndex}>
                                <input
                                    type="checkbox"
                                    className="md-primary"
                                    checked={site.enabled}
                                    onChange={() => storeWebsites()}
                                />
                                <span className={`website-disabled ${!site.enabled ? 'disabled' : ''}`}>
                                    <span>{truncateSiteUrl(site.url)}</span>
                                    {/* <Tooltip>
                                        {site.url}
                                    </Tooltip> */}
                                </span>
                                <button onClick={() => deleteSite(siteIndex)} className="md-icon-button md-accent">
                                    <span>Delete</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr />
                <div className="md-card-actions md-alignment-right" style={{ display: allowDelete ? 'block' : 'none' }}>
                    <button onClick={() => deleteSitesGroup()} className="md-raised">
                        Delete Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SitesGroup;
