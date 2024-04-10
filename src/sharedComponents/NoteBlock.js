import React from 'react';
import styled from 'styled-components';

// Define styled components for styling
const NoteBlockContainer = styled.div`
    padding: 8px 16px;
    overflow: hidden;
    border-left: 4px solid #ffab40;
    background-color: #eee;
    display: block;

    &.warning {
        border-left: 4px solid #ff5252;
        background-color: #ffcdd2;
    }
`;

// Define the NoteBlock component
const NoteBlock = ({ type, children }) => {
    return (
        <div>
            <NoteBlockContainer className={type}>
                {children}
            </NoteBlockContainer>
        </div>
    );
};

export default NoteBlock;
