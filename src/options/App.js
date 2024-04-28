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
import UnlockPage from "./unlock/UnlockPage";
// import SocialMediaShare from "../sharedComponents/SocialMediaShare";

export default class App extends Component {
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
      this.state.selectedTab = tabName
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
          <div>
            <div>123</div>
            <AppBar position="static" className='md-primary' >
              <Toolbar>
                <Typography className='md-title' sx={{ flexGrow: 1 }}>
                  Stay Focused
                </Typography>
                <FormControlLabel control={<Switch checked={this.state.active} 
                                                    onChange={(e) => {this.saveActive(e.target.checked), this.handlchange(this.state.active)}}
                                                    color="warning"
                                            />}
                                  label={this.state.active? "Active": "Inactive"}
                />
              </Toolbar>
            </AppBar>
          </div>
        )}

        {<div> isLocked: {this.state.isLocked} </div>}
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
