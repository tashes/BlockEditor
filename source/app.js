import React, { useState } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import { v4 } from 'uuid';

import { generate } from "../utils/blockid.js";

import Block from "./block.js";
import Instructions from './instructions.js';
import Editor, { initializeData } from "./editor.js";
import Addition from "./addition.js";
import Move from "./move.js";

const App = ({ initialBlocks = [], resolve, reject }) => {
	const [ blocks, setBlocks ] = useState(initialBlocks);
	const [ terminalSize, setTerminalSize ] = useState({
		width: process.stdout.columns,
		height: process.stdout.rows
	});
	const [ current, setCurrent ] = useState(0);
	const [ isRunning, setIsRunning ] = useState(true);
	const [ bottom, setBottom ] = useState("instructions");

	const [ move, setMove ] = useState(undefined);

	const { exit } = useApp();

	useInput((input, key) => {
		if (isRunning) {
			if (bottom === "instructions") {
				if (key.upArrow) setCurrent(prev => prev - 1 >= 0 ? prev - 1 : 0);
				if (key.downArrow) setCurrent(prev => prev + 1 < blocks.length ? prev + 1 : blocks.length - 1);
				if (key.return) {
					setIsRunning(false);
					exit();
					resolve(blocks);
				}
				if (input === "e") setBottom("editor");
				if (input === "d") removeBlock();
				if (input === "a") setBottom("addition");
				if (input === "m") {
					setMove(current);
					setBottom("move");
				}
			}
			else if (
				bottom === "editor" ||
				bottom === "addition"
			) {
			}
			else if (bottom === "move") {
				if (key.upArrow) setCurrent(prev => prev - 1 >= 0 ? prev - 1 : 0);
				if (key.downArrow) setCurrent(prev => prev + 1 < blocks.length ? prev + 1 : blocks.length - 1);
				if (key.escape) {
					setMove(undefined);
					setBottom("instructions");
				}
				if (key.return) {
					let ele = blocks.splice(move, 1)[0];
					blocks.splice(current, 0, ele);
					setBlocks(blocks);
					setMove(undefined);
					setBottom("instructions");
				}
			};
		}
	});

	let previousBlock = blocks[current - 1];
	let currentBlock = blocks[current];
	let nextBlock = blocks[current + 1];
	let afterBlock = blocks[current + 2];

	const changeBlock = (block) => {
		blocks[current] = block;
		setBottom("instructions");
	};
	const removeBlock = () => {
		setBlocks([ ...blocks.slice(0, current), ...blocks.slice(current + 1) ]);
	};
	const addBlock = (blocktype) => {
		let newblock = {
			id: v4(),
			blockid: generate(),
			type: blocktype,
			data: initializeData(blocktype),
			reference: ""
		};
		setBlocks(prev => [ ...prev.slice(0, current), newblock, ...prev.slice(current) ]);
		setBottom("instructions");
	};

	let Values = <></>;
	if (blocks.length > 0) {
		Values = <>
			{ previousBlock && <Block
				index={ current - 1 }
				id={ previousBlock.id }
				blockid={ previousBlock.blockid }
				type={ previousBlock.type }
				data={ previousBlock.data }
				reference={ previousBlock.reference }
				dimColor={ true }
				star={ ( current - 1 ) === move }
				/> }
			{ currentBlock && <Block
				index={ current }
				id={ currentBlock.id }
				blockid={ currentBlock.blockid }
				type={ currentBlock.type }
				data={ currentBlock.data }
				reference={ currentBlock.reference }
				star={ current === move }
				/> }
			{ nextBlock && <Block
				index={ current + 1 }
				id={ nextBlock.id }
				blockid={ nextBlock.blockid }
				type={ nextBlock.type }
				data={ nextBlock.data }
				reference={ nextBlock.reference }
				dimColor={ true }
				star={ ( current + 1 ) === move }
				/> }
			{ afterBlock && <Block
				index={ current + 2 }
				id={ afterBlock.id }
				blockid={ afterBlock.blockid }
				type={ afterBlock.type }
				data={ afterBlock.data }
				reference={ afterBlock.reference }
				dimColor={ true }
				star={ ( current + 2 ) === move }
				/> }
		</>;
	}
	else {
		Values = <Box
			width="100%"
			padding={1}
			flexDirection="row"
			justifyContent="center">
				<Box paddingRight={1} minWidth={5}><Text color="cyan">There are no items. Add some with [A]</Text></Box>
		</Box>
	};

	return (
		<Box
			width={terminalSize.width}
			height={terminalSize.height}
			flexDirection="column"
			justifyContent="center"
			paddingTop={4}
			paddingBottom={4}>
			<Box
				width={terminalSize.width}
				height={terminalSize.height - 4}
				flexDirection="column"
				justifyContent="center">
					{ Values }
			</Box>
			{ bottom === "instructions" && <Instructions/> }
			{ bottom === "editor" && <Editor block={ currentBlock } changeBlock={ changeBlock }/> }
			{ bottom === "addition" && <Addition addBlock={ addBlock }/> }
			{ bottom === "move" && <Move/> }
		</Box>
	);
};

export default App;