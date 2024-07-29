import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

const Move = ({  }) => {
    return (
        <Box
            width="100%"
            height={4}
            flexDirection="row"
            justifyContent="center"
            columnGap={4}
            borderTop={true}
            borderTopColor="white">
                    <Text color="cyan">↑ - Previous Block</Text>
                    <Text color="cyan">↓ - Next Block</Text>
                    <Text color="cyan">↵ - Move Block</Text>
                    <Text color="cyan">Esc - Undo Move</Text>
            </Box>
    );
};

export default Move;