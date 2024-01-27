const PDFMerger = require("pdf-merger-js");
const fs = require('fs');

async function merge(payload, outFile){
  var merger = new PDFMerger();
    for (const element of payload) {
      await merger.add(element.fileName, element.page);
    }
    const mergedPdfBuffer = await merger.saveAsBuffer();
    if (!outFile) return mergedPdfBuffer;
    fs.writeFileSync(outFile, mergedPdfBuffer);
    return outFile; 
}

module.exports = function (RED) {
  function pdfMerger(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on("input", async function (msg) {
      if (!Array.isArray(msg.payload)) node.error("Payload not array");
      const outFile = msg.outFile || config.outFile;
      try {
        const merged = await merge(msg.payload, outFile);
        msg.payload = merged;
        node.send(msg);
      } catch (error) {
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("pdf-merger", pdfMerger);
};
