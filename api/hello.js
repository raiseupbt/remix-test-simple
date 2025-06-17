// Ultra-simple test function
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  });
};