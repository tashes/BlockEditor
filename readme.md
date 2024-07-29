# BlockEditor

A javascript library to run a blocks editor and return the data.

## Install

```bash
$ npm install BlockEditor
```

## Usage

```javascript
import { BlockEditor } from "blockeditor";

let result = await BlockEditor([
  {
    id: "arp118344",
		blockid: "gnglxcrPPr",
		type: "title",
		data: {
			value: "Title!",
			level: 1
		},
		reference: "uuid-lm-a848w"
	},
	{
		id: "arp118343",
		blockid: "gnglxcrPPx",
		type: "paragraph",
		data: {
			value: "Hello there!",
			ranges: [
				{
					from: 0,
					to: 8,
					type: "bold",
					data: {}
				}
			]
		},
		reference: "uuid-v4-i848"
	},
	{
		id: "arp118843",
		blockid: "gnglxdrPPx",
		type: "paragraph",
		data: {
			value: "Elephants are the largest land mammals, known for their intelligence, social structures, and distinctive trunks.",
			ranges: [
				{
					from: 0,
					to: 8,
					type: "bold",
					data: {}
				}
			]
		},
		reference: "uuid-v4-i848"
	},
	{
		id: "arp198343",
		blockid: "gnflxcrPPx",
		type: "paragraph",
		data: {
			value: "They live in matriarchal herds and exhibit complex behaviors like mourning their dead.",
			ranges: [
				{
					from: 0,
					to: 8,
					type: "bold",
					data: {}
				}
			]
		},
		reference: "uuid-v4-i848"
	},
	{
		id: "arp118483",
		blockid: "gnglecrPPx",
		type: "paragraph",
		data: {
			value: "Sadly, they face threats from habitat loss and poaching, making conservation efforts crucial.",
			ranges: [
				{
					from: 0,
					to: 8,
					type: "bold",
					data: {}
				}
			]
		},
		reference: "uuid-v4-i848"
	}
  // ... Other Blocks
]);

console.log(result);
/**
[
  {
    id: 'arp118344',
    blockid: 'gnglxcrPPr',
    type: 'title',
    data: { value: 'Title!', level: 1 },
    reference: 'uuid-lm-a848w'
  },
  {
    id: 'arp118343',
    blockid: 'gnglxcrPPx',
    type: 'paragraph',
    data: { value: 'Hello there!', ranges: [Array] },
    reference: 'uuid-v4-i848'
  },
  {
    id: 'arp118843',
    blockid: 'gnglxdrPPx',
    type: 'paragraph',
    data: {
      value: 'Elephants are the largest land mammals, known for their intelligence, social structures, and distinctive trunks.',
      ranges: [Array]
    },
    reference: 'uuid-v4-i848'
  },
  {
    id: 'arp198343',
    blockid: 'gnflxcrPPx',
    type: 'paragraph',
    data: {
      value: 'They live in matriarchal herds and exhibit complex behaviors like mourning their dead.',
      ranges: [Array]
    },
    reference: 'uuid-v4-i848'
  },
  {
    id: 'arp118483',
    blockid: 'gnglecrPPx',
    type: 'paragraph',
    data: {
      value: 'Sadly, they face threats from habitat loss and poaching, making conservation efforts crucial.',
      ranges: [Array]
    },
    reference: 'uuid-v4-i848'
  }
]
**/
```

## Blocks
Each block has the following properties:
```
{
  id: /^[0-9a-fA-F]{24}$/,
  blockid: /^[0-9a-fA-F_]{10}$/,
  type: <type>,
  data: ... <Specific to type>,
  reference: /^[0-9a-fA-F]{24}$/
}
```

### Title
```
type: "title",
data: {
  value: <string>,
  level: 1-4
}
```

### Paragraph
```
type: "paragraph",
data: {
  value: <string>,
	ranges: [ ... ranges ]
}
```