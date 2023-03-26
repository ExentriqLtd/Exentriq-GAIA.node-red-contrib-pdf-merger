const PDFMerger = require("pdf-merger-js");
const merger = new PDFMerger();

const toMerge = async (payload, outFile) => {
  payload.forEach(async (element) => {
    await merger.add(element.fileName), element.page;
  });

  const mergedPdfBuffer = await merger.saveAsBuffer();
  if (!outFile) return mergedPdfBuffer;
  fs.writeSync("merged.pdf", mergedPdfBuffer);
  return outFile;
};
module.exports = function (RED) {
  function pdfMerger(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on("input", async function (msg) {
      if (!Array.isArray(msg.payload)) node.error("Payload not array");
      const outFile = msg.outFile || config.outFile;
      try {
        const merged = await toMerge(msg.payload, outFile);
        msg.payload = merged;
        node.send(msg);
      } catch (error) {
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("pdf-merger", pdfMerger);
};
