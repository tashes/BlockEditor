import React from 'react';
import { Box, Text } from 'ink';

import { render } from '../utils/render.js';

const Block = ({ index, id, blockid, type, data, reference, dimColor, star }) => {
    let txt = render(type, data);

    let displayIndex = star === true ? "*" : index + 1;

    return (
        <Box
            width="100%"
            padding={1}
            flexDirection="row"
            justifyContent="center">
                <Box paddingRight={1} minWidth={5}><Text color="red" dimColor={ dimColor ? true : false }>[ { displayIndex } ]</Text></Box>
                <Box paddingRight={1}><Text color="green" dimColor={ dimColor ? true : false }>{ type }</Text></Box>
                <Box flexGrow={1}><Text dimColor={ dimColor ? true : false }>{ txt }</Text></Box>
            </Box>
    );
}

export default Block;