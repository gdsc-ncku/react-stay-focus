import React from 'react';
import {websitesListDefault} from '../../defaults'
import {getHostNameFromStringUrl} from "../../helpers";
import {localStorage} from "../../chromeApiHelpers";
import {getSiteGroupStructure, getSiteStructure} from "../../dataHelpers/SitesGroup";
import SitesGroup from "./SitesGroup";
import MdColumn from "../../sharedComponents/MdColumn";
import NoteBlock from "../../sharedComponents/NoteBlock";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './BlockItemBaseTab.css';
class BlockItemBaseTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowCreateNewGroups: props.allowCreateNewGroups || true,
            blockTypeToShow: props.blockTypeToShow || true,
            allowDeleteGroups: props.allowDeleteGroups || true,

            sitesGroups: websitesListDefault,
            newGroupName: "",
        };
        console.log('allowCreateNewGroups', this.state.allowCreateNewGroups)
    }
    componentDidMount() {
        this.loadWebsites();
    }

    findGroupIndexByUid(uid) {
        return this.state.sitesGroups.findIndex(sg => sg.uid === uid);
    }

    loadWebsites() {
        localStorage.get("sitesGroups").then(sitesGroups => {
            this.setState({sitesGroups : sitesGroups});
        }).catch(() => {
            this.storeWebsites();
        })
    }

    storeWebsites = () => {
        localStorage.set("sitesGroups", this.state.sitesGroups);
    }

    addNewSite(groupUid, siteData) {
        let groupIndex = this.findGroupIndexByUid(groupUid);
        let {siteUrl, blockType} = siteData;
        if (blockType === 'website') {
            siteUrl = getHostNameFromStringUrl(siteUrl);
        }
        let group = this.state.sitesGroups[groupIndex];
        group.sitesList = [getSiteStructure(siteUrl, true, blockType), ...group.sitesList];
        this.storeWebsites();
        console.log(this.state.sitesGroups)
        this.setState({ sitesGroups: this.state.sitesGroups }); //rerender
    }

    addNewGroup() {
        this.setState(prevState => ({
            sitesGroups: [getSiteGroupStructure(prevState.newGroupName), ...prevState.sitesGroups],
            newGroupName: ""
        }), this.storeWebsites);
    }

    deleteGroup = (groupUid) => {
        let groupIndex = this.findGroupIndexByUid(groupUid);
        let newSitesGroups = [...this.state.sitesGroups];
        newSitesGroups.splice(groupIndex, 1);
        this.setState({ sitesGroups: newSitesGroups }, this.storeWebsites);
    }

    deleteSite(groupUid, siteIndex) {
        let groupIndex = this.findGroupIndexByUid(groupUid);
        console.log('groupIndex', groupIndex)
        setTimeout(() => {
            let newSitesGroups = [...this.state.sitesGroups];
            let group = newSitesGroups[groupIndex];
            group.sitesList.splice(siteIndex, 1);
            this.setState({ sitesGroups: newSitesGroups }, this.storeWebsites);
        }, 10)
    }

    toShowSitesGroups() {
        console.log(this.state.sitesGroups.filter(sg => this.state.blockTypeToShow === sg.blockType))
        return this.state.sitesGroups.filter(sg => this.state.blockTypeToShow === sg.blockType);
    }

    render() {
        // const toShowSitesGroups = this.state.sitesGroups.filter(sg => this.props.blockTypeToShow === sg.blockType);
        // const hasNote = !!this.props.children;

        return (
            <div>
                {this.state.allowCreateNewGroups && (
                    <>
                    <Box sx={{
                            '& .MuiTextField-root': { m: 1, width: '60ch' },
                        }}>
                        <TextField id="standard-basic" 
                                    label="Type the name of the new group of websites(ex: E-Commerce)"
                                    value={this.state.newGroupName}
                                    variant="standard"
                                    onChange={(e) => {this.setState({newGroupName : e.target.value})}}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            this.setState({newGroupName : e.target.value}, () => {
                                            this.addNewGroup();
                                            })
                                        }
                                    }} />
                    </Box>
                    </>
                )}
    
            <div className="sites-groups">
                {this.toShowSitesGroups().map((sitesGroup, groupIndex) => 
                    <SitesGroup
                        key={sitesGroup.uid}
                        sitesGroup={sitesGroup}
                        allowDelete={this.state.allowDeleteGroups}
                        storeWebsites={this.storeWebsites}
                        addNewWebsite={(siteData) => this.addNewSite(sitesGroup.uid, siteData)}
                        deleteSitesGroup={() => this.deleteGroup(sitesGroup.uid)}
                        deleteSite={(siteIndex) => this.deleteSite(sitesGroup.uid, siteIndex)}
                        >
                        </SitesGroup>
                )}
                </div>
            </div>
        );
    }
}

export default BlockItemBaseTab;