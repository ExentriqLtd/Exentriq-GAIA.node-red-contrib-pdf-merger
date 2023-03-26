# PDF Merger Node

This Node-Red Node can merge multiple PDF documents, or parts of them, to one new PDF document.

## Installation

To install the package, run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install node-red-contrib-pdf-merger
```

## Examples

```javascript
msg.payload = [
  { fileName: "test1.pdf", page: "1-3" },
  { fileName: "test2.pdf", page: "1" },
];
```

## Error Handling

This node returns an error message when the HTML content cannot be converted. The error message can be retrieved using the `error` property added to the node's output.
