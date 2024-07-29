import React from 'react';
import { Box, Text } from 'ink';

import TitleEditor, { initializeTitle } from "./editors/title.js";
import ParagraphEditor, { initializeParagraph } from './editors/paragraph.js';

const Editor = ({ block, changeBlock }) => {
    const changeBlockData = (data) => {
        block.data = data;
        changeBlock(block);
    }

    return (
        <Box>
            {
                (block.type === "title") ? <TitleEditor data={ block.data } changeBlockData={ changeBlockData } /> :
                (block.type === "paragraph") ? <ParagraphEditor data={ block.data } changeBlockData={ changeBlockData } /> :
                <Text>Unkown Block Type</Text>
            }
        </Box>
    );
};

export default Editor;

export const BLOCKTYPES = [
    "Title",
    "Paragraph"
];

export function initializeData (type) {
    if (type === "title") {
        return initializeTitle();
    }
    else if (type === "paragraph") {
        return initializeParagraph();
    }
};