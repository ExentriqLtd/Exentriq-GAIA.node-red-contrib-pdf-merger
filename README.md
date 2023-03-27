# PDF Merger Node

This Node-Red Node can merge multiple PDF documents, or parts of them, to one new PDF document.

## Installation

To install the package, run the following command in your Node-RED user directory (typically `~/.node-red`);

```bash
npm install node-red-contrib-pdf-merger
```

## Examples

```JSON
[{"id":"917c2e945c584811","type":"function","z":"5c2c0a4858445b3b","name":"function 5","func":"msg.payload = [\n    {\n        fileName: \"/Users/omerkaptan/Downloads/dummy.pdf\",\n        page: \"2\"\n    },\n    {\n        fileName: \"/Users/omerkaptan/Downloads/sample.pdf\",\n        page: \"1\"\n    }\n]\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":600,"y":140,"wires":[["c80af8038d64c9a0"]]},{"id":"f6fc50ee2b18a97a","type":"inject","z":"5c2c0a4858445b3b","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":460,"y":140,"wires":[["917c2e945c584811"]]},{"id":"c80af8038d64c9a0","type":"pdf-merger","z":"5c2c0a4858445b3b","name":"","filename":"","outFile":"","x":770,"y":140,"wires":[["e2bd93157d3ec217"]]},{"id":"e2bd93157d3ec217","type":"debug","z":"5c2c0a4858445b3b","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":920,"y":140,"wires":[]}]
```

## Error Handling

This node returns an error message when the HTML content cannot be converted. The error message can be retrieved using the `error` property added to the node's output.
