import React from 'react';
import BlockItemBaseTab from './BlockItemBaseTab';

class BlockByRegexTab extends React.Component {
  render() {
    return (
      <BlockItemBaseTab
        allowCreateNewGroups={false}
        blockTypeToShow="regex"
        allowDeleteGroups={false}
      >
        Note: If you don't know what is Regex, just ignore this page.
      </BlockItemBaseTab>
    );
  }
}

export default BlockByRegexTab;