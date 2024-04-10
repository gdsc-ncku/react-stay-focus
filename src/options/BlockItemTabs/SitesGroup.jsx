import React from 'react';
import { truncateText } from "../../helpers";
import AddBlockItemToList from "./AddBlockItemToList";
import Tooltip from "../../sharedComponents/Tooltip";
import { blockTypes } from "../../constants";

class SitesGroup extends React.Component {
    constructor(props) {
        super(props);
        this.truncateSiteUrl = this.truncateSiteUrl.bind(this);
    }

    truncateSiteUrl(siteUrl) {
        return truncateText(siteUrl, 15);
    }

    render() {
        const { sitesGroup, allowDelete } = this.props;

        return (
            <div className={`site-group ${sitesGroup.groupEnabled ? '' : 'disabled'}`}>
                <div className="md-card">
                    <div className="card-header">
                        <div className="md-title">{sitesGroup.groupName}</div>
                        <input
                            type="checkbox"
                            className="enable-group-switch"
                            checked={sitesGroup.groupEnabled}
                            onChange={() => this.props.storeWebsites()}
                        />
                    </div>
                    <div className="md-card-content">
                        <AddBlockItemToList
                            blockType={sitesGroup.blockType}
                            onAddNewWebsite={(data) => this.props.addNewWebsite(data)}
                        />
                        <ul className="md-list md-dense">
                            {sitesGroup.sitesList.map((site, siteIndex) => (
                                <li key={siteIndex}>
                                    <input
                                        type="checkbox"
                                        className="md-primary"
                                        checked={site.enabled}
                                        onChange={() => this.props.storeWebsites()}
                                    />
                                    <span className={`website-disabled ${!site.enabled ? 'disabled' : ''}`}>
                                        <span>{this.truncateSiteUrl(site.url)}</span>
                                        <Tooltip>
                                            {site.url}
                                        </Tooltip>
                                    </span>
                                    <button onClick={() => this.props.deleteSite(siteIndex)} className="md-icon-button md-accent">
                                        <span>Delete</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div className="md-card-actions md-alignment-right" style={{ display: allowDelete ? 'block' : 'none' }}>
                        <button onClick={() => this.props.deleteSitesGroup()} className="md-raised">
                            Delete Group
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SitesGroup;
