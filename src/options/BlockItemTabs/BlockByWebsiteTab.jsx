import React from 'react';
import BlockItemBaseTab from './BlockItemBaseTab';

class BlockByWebsiteTab extends React.Component {
    render() {
        return (
            <div>
                {<BlockItemBaseTab allowCreateNewGroups={true} blockTypeToShow="website" />}
            </div>
        );
    }
}

export default BlockByWebsiteTab;
