import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';

const Instructions = ({  }) => {
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
                    <Text color="cyan">↵ - Save Changes</Text>
                    <Text color="cyan">E - Edit Block</Text>
                    <Text color="cyan">D - Delete Block</Text>
                    <Text color="cyan">A - Add Block</Text>
                    <Text color="cyan">M - Move Block</Text>
            </Box>
    );
};

export default Instructions;