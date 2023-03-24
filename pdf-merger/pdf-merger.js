const PDFMerger = require("pdf-merger-js");
const merger = new PDFMerger();

const toMerge = async (filename, page, outFile) => {
  await merger.add(filename), page;

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
      const filename = config.filename || msg.filename;
      const page = msg.payload || "";
      const outFile = msg.outFile || config.outFile;
      try {
        const merged = await toMerge(filename, page, outFile);
        msg.payload = merged;
        node.send(msg);
      } catch (error) {
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("pdf-merger", pdfMerger);
};
