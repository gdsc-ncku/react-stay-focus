import React, { Component } from 'react';
import SettingsTab from "./SettingsTab";
import AboutTab from "./AboutTab";
import BlockByWebsiteTab from "./BlockItemTabs/BlockByWebsiteTab";
import BlockByWordTab from "./BlockItemTabs/BlockByWordTab";
import BlockByRegexTab from "./BlockItemTabs/BlockByRegexTab";
import { localStorage, setLocalStorage } from "../chromeApiHelpers";
import CircularProgress from '@material-ui/core/CircularProgress'; //md-progress-spinner
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import UnlockPage from "./unlock/UnlockPage";
// import SocialMediaShare from "../sharedComponents/SocialMediaShare";

export default class App extends Component {
    drawerWidth = 240;

    constructor(props) {
      super(props)
      this.state = {
        selectedTab: "block-by-website-tab",
        active: false,
        lockType: "none",
        isLocked: false,
        loading: true
      }
    }
    componentDidMount() {
      this.loadData()
      this.state.loading = false
      console.log("loading success")
    }
    selectTab(tabName) {
      console.log("now setting to", tabName);
      this.setState({selectedTab : tabName});
    }
    isSelectedTab(tabName) {
      return this.state.selectedTab === tabName
    }
    handleUnlock = () => {
      this.setState({isLocked : false})
      this.setState({active : false})
      console.log("unlock was invoked success  in app.js", this.state.isLocked);
    }
    loadData = () => {
      localStorage.get("active")
        .then(active => {
          this.setState({ active: active })
          console.log("active", active)
        })
        .catch((error) => {
          console.error("獲取資料失敗ha ha:", error);
          // 在這裡可以處理錯誤情況
        });
      localStorage.get("settings").then(settings => {
        this.setState({ lockType: settings.lock.type })
        this.setState({
          isLocked:
            this.state.lockType !== "none" &&
            (this.state.active === true || this.state.lockType === "password")
        })
      })
    }

    saveActive(active) {
      localStorage.set("active", active);
      localStorage.get("active")
          .then(active => {
          console.log("active is getting", active);
          })
      // setIcon(active);
    };

    handlchange = (active) => {
      this.setState({active: !active});
    }

    generateTab = (text, text_id, icon) => {
      return <List>
        <ListItem>
          <ListItemButton onClick={() => this.selectTab(text_id)}>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </List>;
    }

    render() {
    return (
      <div className='page-container'>
        {this.state.loading && (
          <CircularProgress className='loader' size={100} thickness={10}></CircularProgress>
        )}

        {!this.state.loading && this.state.isLocked && (
          <UnlockPage handleUnlock={this.handleUnlock}></UnlockPage>
        )}

        {!this.state.loading && !this.state.isLocked && (
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{width: { sm: `calc(100% - ${this.drawerWidth}px)` , }, 
                                                      ml: { sm: `${this.drawerWidth}px` }}}>
              <Toolbar>
                <Typography className='md-title' sx={{ flexGrow: 1 }} noWrap component="div">Stay Focused</Typography>
                <FormControlLabel control={<Switch checked={this.state.active} onChange={(e) => {this.saveActive(e.target.checked), this.handlchange(this.state.active)}}
                                                    color="warning"/>}
                                  label={this.state.active? "Active": "Inactive"}/>
              </Toolbar>
            </AppBar>
            
            <Box
              component="nav"
              sx={{ width: { sm: this.drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer anchor="left"
                      variant="permanent"
                      sx={{
                        display: 'block',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: this.drawerWidth },
                      }}>

                {this.generateTab("Block by Website", "block-by-website-tab", <MoveToInboxIcon />)}
                {this.generateTab("Block By Word", "block-by-word-tab", <StickyNote2Icon />)}
                {this.generateTab("Block By Regex", "block-by-regex-tab", <SpellcheckIcon />)}
                {this.generateTab("Settings", "settings-tab", <SettingsIcon />)}
                {this.generateTab("About", "about-tab", <InfoIcon />)}
              </Drawer>
              </Box>

              <Box component="nav" sx={{ display: 'flex', paddingTop: 5}}>
                  {this.state.selectedTab == "settings-tab" && (
                    <div>test</div>
                  )}
              </Box>
          </Box>
        )}
      </div>
    )
    }
}

// const ComponentReloadData = ({ reloadData, selectedTab }) => {
//     switch (selectedTab) {
//         case "settings-tab":
//             return <SettingsTab reloadData={reloadData} />;
//         case "about-tab":
//             return <AboutTab reloadData={reloadData} />;
//         case "block-by-website-tab":
//             return <BlockByWebsiteTab reloadData={reloadData} />;
//         case "block-by-word-tab":
//             return <BlockByWordTab reloadData={reloadData} />;
//         case "block-by-regex-tab":
//             return <BlockByRegexTab reloadData={reloadData} />;
//         default:
//             return null;
//     }
// };

//  App;
