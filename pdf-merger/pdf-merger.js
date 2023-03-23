const PDFMerger = require("pdf-merger-js");
const { promisify } = require("util");
const merger = new PDFMerger();

const pdfMerger = async (filename,page,outFile) => {
  await merger.add(filename),page;

  const mergedPdfBuffer = await merger.saveAsBuffer();
  return mergedPdfBuffer
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
  
};

module.exports = function (RED) {
  function pdfMerger(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.on("input", async function (msg) {
      const filename = config.filename || msg.filename;
      const page = msg.payload || "";
      try {
        const merged =  pdfMerger({
            filename,
            page
        });
        msg.payload = merged;
        node.send(msg);
      } catch (error) {
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("pdf-merger", pdfMerger);
};
