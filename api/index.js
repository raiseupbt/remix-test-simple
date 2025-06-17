const { createRequestHandler } = require("@remix-run/node");

module.exports = async (req, res) => {
  try {
    // Import build dinamicamente
    const build = await import("../build/index.js");
    
    const handler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV || "production"
    });
    
    return handler(req, res);
  } catch (error) {
    console.error("Build import error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};