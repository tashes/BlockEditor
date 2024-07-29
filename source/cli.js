#!/usr/bin/env node
import React, { useState } from 'react';
import {render} from 'ink';
import App from './app.js';

export function edit (items) {
	return new Promise((res, rej) => {
		const resolve = (blocks) => {
			res(blocks);
		};
		const reject = (e) => {
			rej(e);
		};
		
		render(<App
			initialBlocks={ items }
			resolve={ resolve }
			reject={ reject }/>);
	});
};

// console.log(await edit([
// 	{
// 		id: "arp118344",
// 		blockid: "gnglxcrPPr",
// 		type: "title",
// 		data: {
// 			value: "Title!",
// 			level: 1
// 		},
// 		reference: "uuid-lm-a848w"
// 	},
// 	{
// 		id: "arp118343",
// 		blockid: "gnglxcrPPx",
// 		type: "paragraph",
// 		data: {
// 			value: "Hello there!",
// 			ranges: [
// 				{
// 					from: 0,
// 					to: 8,
// 					type: "bold",
// 					data: {}
// 				}
// 			]
// 		},
// 		reference: "uuid-v4-i848"
// 	},
// 	{
// 		id: "arp118843",
// 		blockid: "gnglxdrPPx",
// 		type: "paragraph",
// 		data: {
// 			value: "Elephants are the largest land mammals, known for their intelligence, social structures, and distinctive trunks.",
// 			ranges: [
// 				{
// 					from: 0,
// 					to: 8,
// 					type: "bold",
// 					data: {}
// 				}
// 			]
// 		},
// 		reference: "uuid-v4-i848"
// 	},
// 	{
// 		id: "arp198343",
// 		blockid: "gnflxcrPPx",
// 		type: "paragraph",
// 		data: {
// 			value: "They live in matriarchal herds and exhibit complex behaviors like mourning their dead.",
// 			ranges: [
// 				{
// 					from: 0,
// 					to: 8,
// 					type: "bold",
// 					data: {}
// 				}
// 			]
// 		},
// 		reference: "uuid-v4-i848"
// 	},
// 	{
// 		id: "arp118483",
// 		blockid: "gnglecrPPx",
// 		type: "paragraph",
// 		data: {
// 			value: "Sadly, they face threats from habitat loss and poaching, making conservation efforts crucial.",
// 			ranges: [
// 				{
// 					from: 0,
// 					to: 8,
// 					type: "bold",
// 					data: {}
// 				}
// 			]
// 		},
// 		reference: "uuid-v4-i848"
// 	}
// ]));