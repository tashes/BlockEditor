import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

const TitleEditor = ({ data, changeBlockData }) => {
    let [ screen, setScreen ] = useState("page");

    let [ pageCursor, setPageCursor ] = useState(0);

    let [ value, setValue ] = useState(data.value);
    let [ valueCursor, setValueCursor ] = useState(0);

    let [ level, setLevel ] = useState(data.level);

    useInput((input, key) => {
        if (screen === "page") {
            if (key.upArrow) setPageCursor(prev => prev - 1 >= 0 ? prev - 1 : 0);
            if (key.downArrow) setPageCursor(prev => prev + 1 < 2 ? prev + 1 : 1);
            if (key.return) {
                if (pageCursor === 0) setScreen("value");
                else if (pageCursor === 1) setScreen("level");
            }
        }
        else if (screen === "value") {
            if (key.leftArrow) setValueCursor(prev => prev - 1 >= 0 ? prev - 1 : 0);
            else if (key.rightArrow) setValueCursor(prev => prev + 1 < value.length ? prev + 1 : value.length);
            else if (key.return) {
                data.value = value;
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
        else if (screen === "level") {
            if (key.leftArrow) setLevel(prev => prev - 1 >= 1 ? prev - 1 : 1);
            else if (key.rightArrow) setLevel(prev => prev + 1 < 5 ? prev + 1 : 4);
            else if (key.return) {
                data.level = level;
                changeBlockData(data);
            }
        }
    });

    let page = <></>;
    if (screen === "page") {
        page = <Box flexDirection="row" padding={2} flexWrap="wrap">
            <Box width="100%"><Text color="cyan" >Select Property to Modify</Text></Box>
            <Box width="100%"><Text>{ pageCursor === 0 ? "> " : "  " }</Text><Text dimColor={ !(pageCursor === 0) }>Value</Text></Box>
            <Box width="100%"><Text>{ pageCursor === 1 ? "> " : "  " }</Text><Text dimColor={ !(pageCursor === 1) }>Level</Text></Box>
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
    else if (screen === "level") {
        page = <Box width="100%" padding={1} flexDirection="column">
            <Box width="100%" padding={1} flexDirection="row">
                <Box width="25%" justifyContent="center" alignItems="center"><Text dimColor={ level >= 1 ? false : true }>Level 1</Text></Box>
                <Box width="25%" justifyContent="center" alignItems="center"><Text dimColor={ level >= 2 ? false : true }>Level 2</Text></Box>
                <Box width="25%" justifyContent="center" alignItems="center"><Text dimColor={ level >= 3 ? false : true }>Level 3</Text></Box>
                <Box width="25%" justifyContent="center" alignItems="center"><Text dimColor={ level >= 4 ? false : true }>Level 4</Text></Box>
            </Box>
            <Box
                width="100%"
                padding={1}
                flexDirection="row"
                justifyContent="center"
                columnGap={4}>
                    <Text color="cyan">← - Decrease Level</Text>
                    <Text color="cyan">→ - Increase Level</Text>
                    <Text color="cyan">↵ - Save Changes</Text>
                    <Text color="cyan">Esc - Cancel Changes</Text>
            </Box>
        </Box>
    }

    return page;
};

export default TitleEditor;

export function initializeTitle () {
    return {
        value: "",
        level: 1
    };
};