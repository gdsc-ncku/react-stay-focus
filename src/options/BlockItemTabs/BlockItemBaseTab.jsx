import React, { useState, useEffect } from 'react';
import SitesGroup from './SitesGroup';
import { websitesListDefault } from '../../defaults';
import { getHostNameFromStringUrl } from '../../helpers';
import { localStorage } from '../../chromeApiHelpers';
import { getSiteGroupStructure, getSiteStructure } from '../../dataHelpers/SitesGroup';
import MdColumn from '../../sharedComponents/MdColumn';
import NoteBlock from '../../sharedComponents/NoteBlock';

const BlockItemBaseTab = ({ allowCreateNewGroups = true, blockTypeToShow, allowDeleteGroups = true }) => {
    const [sitesGroups, setSitesGroups] = useState(websitesListDefault);
    const [newGroupName, setNewGroupName] = useState('');

    useEffect(() => {
        loadWebsites();
    }, []);

    const toShowSitesGroups = sitesGroups.filter(sg => blockTypeToShow === sg.blockType);
    const hasNote = React.Children.count(this.props.children) > 0;

    const findGroupIndexByUid = uid => sitesGroups.findIndex(sg => sg.uid === uid);

    const loadWebsites = () => {
        localStorage.get('sitesGroups')
            .then(sitesGroups => setSitesGroups(sitesGroups))
            .catch(() => storeWebsites()); // initial run for the app will get default data
    };

    const storeWebsites = () => {
        localStorage.set('sitesGroups', sitesGroups);
    };

    const addNewSite = (groupUid, siteData) => {
        const groupIndex = findGroupIndexByUid(groupUid);
        let { siteUrl, blockType } = siteData;
        if (blockType === 'website') {
            siteUrl = getHostNameFromStringUrl(siteUrl);
        }
        const group = sitesGroups[groupIndex];
        group.sitesList = [getSiteStructure(siteUrl, true, blockType), ...group.sitesList];
        storeWebsites();
    };

    const changeGroupStatus = groupIndex => {
        storeWebsites();
    };

    const addNewGroup = () => {
        setSitesGroups([getSiteGroupStructure(newGroupName), ...sitesGroups]);
        setNewGroupName('');
        storeWebsites();
    };

    const deleteGroup = groupUid => {
        const groupIndex = findGroupIndexByUid(groupUid);
        sitesGroups.splice(groupIndex, 1);
        storeWebsites();
    };

    const deleteSite = (groupUid, siteIndex) => {
        const groupIndex = findGroupIndexByUid(groupUid);
        setTimeout(() => {
            const group = sitesGroups[groupIndex];
            group.sitesList.splice(siteIndex, 1);
            storeWebsites();
        }, 10);
    };

    const toggleSiteEnable = () => {
        storeWebsites();
    };

    return (
        <div>
            <NoteBlock class="note" type="warning" v-if={hasNote}>
                {props.children}
            </NoteBlock>
            <MdColumn v-if={allowCreateNewGroups} class="enter-new-group-input" width={50}>
                <label>Type the name of the new group of websites(ex: E-Commerce)</label>
                <input onKeyUp={addNewGroup} value={newGroupName} onChange={e => setNewGroupName(e.target.value)} />
            </MdColumn>
            <div className="sites-groups">
                {toShowSitesGroups.map((sitesGroup, groupIndex) => (
                    <SitesGroup
                        key={sitesGroup.uid}
                        sitesGroup={sitesGroup}
                        allow-delete={allowDeleteGroups}
                        store-websites={storeWebsites}
                        add-new-website={siteData => addNewSite(sitesGroup.uid, siteData)}
                        delete-sites-group={() => deleteGroup(sitesGroup.uid)}
                        delete-site={siteIndex => deleteSite(sitesGroup.uid, siteIndex)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlockItemBaseTab;
