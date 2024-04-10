import React, { useState } from 'react';
import { isValidURL } from '../../helpers';
import { blockTypes } from '../../constants';

function AddBlockItemToList({ blockType, onAddNewWebsite }) {
    const [siteUrl, setSiteUrl] = useState('');
    
    const isValidBlockItem = () => {
        switch (blockType) {
            case "website":
                return isValidURL(siteUrl);
            default:
                return true;
        }
    };
    
    const handleEnterWebsite = () => {
        if (siteUrl !== "" && isValidBlockItem()) {
            onAddNewWebsite({ siteUrl });
            setSiteUrl('');
        }
    };

    return (
        <div>
            <div className="enter-website-field">
                <label>Type your new website</label>
                <input
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    onKeyUp={(e) => { if (e.key === 'Enter') handleEnterWebsite(); }}
                />
            </div>
            {siteUrl !== '' && !isValidBlockItem() && (
                <span className="md-error">Invalid Website</span>
            )}
        </div>
    );
}

export default AddBlockItemToList;
