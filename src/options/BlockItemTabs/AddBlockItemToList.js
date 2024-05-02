import React from 'react';
import { blockTypes } from '../../constants';
import { isValidURL } from "../../helpers";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

class AddBlockItemToList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteData: {
                siteUrl: "",
            }, 
            blockType: props.blockType
        };
    }

    isValidBlockItem = () => {
        switch (this.state.blockType) {
            case "website":
                return isValidURL(this.state.siteData.siteUrl);
            default:
                return true;
        }
    };

    handleEnterWebsite = (event) => {
        if (event.key === 'Enter') {
            console.log("handleEnterWebsite")
            if (this.state.siteData.siteUrl !== "" && this.isValidBlockItem()) {
                this.props.addNewWebsite(this.state.siteData);
                this.setState({ siteData: { siteUrl: '' } });
            }
        }
    }

    blockTypes() {
        return blockTypes;
    }

    render() {
        return (
            <div>
                <Box sx={{
                            '& .MuiTextField-root': { m: 1, width: '60ch' },
                        }}>
                        <TextField id="standard-basic" 
                                    label="Type your new website"
                                    value={this.state.siteData.siteUrl}
                                    variant="standard"
                                    onChange={(e) => {this.setState({siteData : {siteUrl: e.target.value}})}}
                                    onKeyUp={(e) => {this.handleEnterWebsite(e)}
                                    } />
                    </Box>
                {this.state.siteData.siteUrl !== '' && !this.isValidBlockItem() && <span className="md-error">Invalid Website</span>}
            </div>
        );
    }
}

export default AddBlockItemToList;