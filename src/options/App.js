import React, { Component } from 'react';
import SettingsTab from "./SettingsTab";
import AboutTab from "./AboutTab";
import BlockByWebsiteTab from "./BlockItemTabs/BlockByWebsiteTab";
import BlockByWordTab from "./BlockItemTabs/BlockByWordTab";
import BlockByRegexTab from "./BlockItemTabs/BlockByRegexTab";
import { localStorage, setLocalStorage } from "../chromeApiHelpers";
import CircularProgress from '@material-ui/core/CircularProgress'; //md-progress-spinner
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
      this.state.active = false
      console.log("unlock was invoked success", this.state.isLocked);
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
    render() {
    return (
      <div className='page-container'>
        {this.state.loading && (
          <CircularProgress className='loader' size={100} thickness={10}></CircularProgress>
        )}

        {this.state.isLocked && (
          <UnlockPage handleUnlock={this.handleUnlock}></UnlockPage>
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
