import React from 'react';
import BlockItemBaseTab from './BlockItemBaseTab';

const BlockByWordTab = () => {
    return (
        <BlockItemBaseTab
            allowCreateNewGroups={false}
            blockTypeToShow={'word'}
            allowDeleteGroups={false}
        >
            <div>
                Note: Don't use short words, for example the letter 'a', since this will block any site that has letter 'a'
            </div>
        </BlockItemBaseTab>
    );
};

export default BlockByWordTab;
