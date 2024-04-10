import React from 'react';
import BlockItemBaseTab from './BlockItemBaseTab';

function BlockByRegexTab() {
    return (
        <BlockItemBaseTab
            allowCreateNewGroups={false}
            blockTypeToShow={'regex'}
            allowDeleteGroups={false}
        >
            <div>
                Note: If you don't know what is Regex, just ignore this page.
            </div>
        </BlockItemBaseTab>
    );
}

export default BlockByRegexTab;
