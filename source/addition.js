import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

import { BLOCKTYPES } from './editor.js';

const Addition = ({ addBlock }) => {
    let [ screen, setScreen ] = useState("page");

    let [ pageCursor, setPageCursor ] = useState(0);

    useInput((input, key) => {
        if (screen === "page") {
            if (key.upArrow) setPageCursor(prev => prev - 1 >= 0 ? prev - 1 : 0);
            if (key.downArrow) setPageCursor(prev => prev + 1 < 2 ? prev + 1 : 1);
            if (key.return) {
                addBlock(BLOCKTYPES[pageCursor].toLowerCase());
            }
        }
    });

    let options = [];
    for (let i = 0; i < BLOCKTYPES.length; i++) {
        options.push(<Box width="100%"><Text>{ pageCursor === i ? "> " : "  " }</Text><Text dimColor={ !(pageCursor === i) }>{ BLOCKTYPES[i] }</Text></Box>)
    }

    let page = <></>;
    if (screen === "page") {
        page = <Box flexDirection="row" padding={2} flexWrap="wrap">
            <Box width="100%"><Text color="cyan" >Block Type to Add</Text></Box>
            { options }
        </Box>
    }

    return page;
};

export default Addition;