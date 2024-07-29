import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

const ParagraphEditor = ({ data, changeBlockData }) => {
    let [ screen, setScreen ] = useState("page");

    let [ pageCursor, setPageCursor ] = useState(0);

    let [ value, setValue ] = useState(data.value);
    let [ valueCursor, setValueCursor ] = useState(0);

    useInput((input, key) => {
        if (screen === "page") {
            if (key.upArrow) setPageCursor(prev => prev - 1 >= 0 ? prev - 1 : 0);
            if (key.downArrow) setPageCursor(prev => prev + 1 < 2 ? prev + 1 : 1);
            if (key.return) {
                if (pageCursor === 0) setScreen("value");
                else if (pageCursor === 1) setScreen("ranges");
            }
        }
        else if (screen === "value") {
            if (key.leftArrow) setValueCursor(prev => prev - 1 >= 0 ? prev - 1 : 0);
            else if (key.rightArrow) setValueCursor(prev => prev + 1 < value.length ? prev + 1 : value.length);
            else if (key.return) {
                data.value = value;
                // TODO Reset ranges
                changeBlockData(data);
            }
            else if (key.delete || key.backspace || input === '\x08' || input === '\x7F') {
                if (valueCursor > 0) {
                    setValue(val => val.slice(0, valueCursor - 1) + val.slice(valueCursor));
                    setValueCursor(cursor => cursor - 1);
                }
            }
            else if (input) {
                setValue(val => val.slice(0, valueCursor) + input + val.slice(valueCursor));
                setValueCursor(cursor => cursor + input.length);
            }
        }
        else if (screen === "ranges") {
            // TODO Add range editor
        }
    });

    let page = <></>;
    if (screen === "page") {
        page = <Box flexDirection="row" padding={2} flexWrap="wrap">
            <Box width="100%"><Text color="cyan" >Select Property to Modify</Text></Box>
            <Box width="100%"><Text>{ pageCursor === 0 ? "> " : "  " }</Text><Text dimColor={ !(pageCursor === 0) }>Value</Text></Box>
            <Box width="100%"><Text>{ pageCursor === 1 ? "> " : "  " }</Text><Text dimColor={ !(pageCursor === 1) }>Ranges</Text></Box>
        </Box>
    }
    else if (screen === "value") {
        page = <Box width="100%" padding={1} flexDirection="column">
            <Box padding={1}>
                <Text>{ value.slice(0, valueCursor) }<Text backgroundColor="cyan"> </Text>{ value.slice(valueCursor) }</Text>
            </Box>
            <Box
                width="100%"
                padding={1}
                flexDirection="row"
                justifyContent="center"
                columnGap={4}>
                    <Text color="cyan">← - Move Cursor Left</Text>
                    <Text color="cyan">→ - Move Cursor Right</Text>
                    <Text color="cyan">↵ - Save Changes</Text>
                    <Text color="cyan">Esc - Cancel Changes</Text>
            </Box>
        </Box>
    }

    return page;
};

export default ParagraphEditor;

export function initializeParagraph () {
    return {
        value: "",
        ranges: []
    };
};