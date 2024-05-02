import React from 'react';
import BlockItemBaseTab from './BlockItemBaseTab';

class BlockByWordTab extends React.Component {
  render() {
    return (
      <BlockItemBaseTab
        allowCreateNewGroups={false}
        blockTypeToShow="word"
        allowDeleteGroups={false}
      >
        Note: Don't use short words, for example the letter 'a', since this will block any site that has
        letter 'a'
      </BlockItemBaseTab>
    );
  }
}

export default BlockByWordTab;